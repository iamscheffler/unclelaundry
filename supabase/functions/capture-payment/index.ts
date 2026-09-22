// Supabase Edge Function: capture-payment
//
// Bucht den tatsächlichen Betrag von einer bestehenden Stripe-Reservierung
// ab (nie mehr als ursprünglich reserviert). Wird aus der Betriebs-Ansicht
// aufgerufen, nachdem das Gewicht eingetragen wurde. Nur Mitarbeiter
// (profiles.ist_mitarbeiter) dürfen das auslösen.
//
// Einrichtung im Supabase-Dashboard:
//   1. "Edge Functions" -> "Deploy a new function" -> "Via Editor"
//   2. Name: capture-payment
//   3. Diesen kompletten Code einfügen und "Deploy" klicken.
//   Nutzt denselben STRIPE_SECRET_KEY wie create-payment-intent.

import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function fehler(nachricht: string, status = 400) {
  return new Response(JSON.stringify({ error: nachricht }), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return fehler("Nur POST erlaubt.", 405);
  }

  let bestellung_id: unknown, tatsaechliches_gewicht_kg: unknown, betrag_cent: unknown;
  try {
    const body = await req.json();
    bestellung_id = body.bestellung_id;
    tatsaechliches_gewicht_kg = body.tatsaechliches_gewicht_kg;
    betrag_cent = body.betrag_cent;
  } catch {
    return fehler("Ungültige Anfrage.");
  }

  if (typeof bestellung_id !== "string" || !bestellung_id) return fehler("Bestellung fehlt.");
  if (!Number.isInteger(betrag_cent) || (betrag_cent as number) <= 0) return fehler("Ungültiger Betrag.");
  if (
    tatsaechliches_gewicht_kg !== null &&
    tatsaechliches_gewicht_kg !== undefined &&
    typeof tatsaechliches_gewicht_kg !== "number"
  ) {
    return fehler("Ungültiges Gewicht.");
  }

  const authHeader = req.headers.get("Authorization");
  if (!authHeader) return fehler("Nicht angemeldet.", 401);

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: authHeader } } }
  );

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) return fehler("Nicht angemeldet.", 401);

  // Nur Mitarbeiter dürfen abrechnen.
  const { data: profil } = await supabase
    .from("profiles")
    .select("ist_mitarbeiter")
    .eq("id", userData.user.id)
    .maybeSingle();
  if (!profil?.ist_mitarbeiter) return fehler("Kein Zugriff.", 403);

  const { data: bestellung, error: bestellungFehler } = await supabase
    .from("bestellungen")
    .select("id, stripe_payment_intent_id, hoechstbetrag_cent, bezahlt")
    .eq("id", bestellung_id)
    .maybeSingle();
  if (bestellungFehler || !bestellung) return fehler("Bestellung nicht gefunden.", 404);
  if (bestellung.bezahlt) return fehler("Diese Bestellung ist schon abgerechnet.", 409);
  if (!bestellung.stripe_payment_intent_id) return fehler("Zu dieser Bestellung liegt keine Reservierung vor.");
  if ((betrag_cent as number) > bestellung.hoechstbetrag_cent) {
    return fehler("Der Betrag übersteigt die ursprüngliche Reservierung.");
  }

  const stripeSecret = Deno.env.get("STRIPE_SECRET_KEY");
  if (!stripeSecret) return fehler("Zahlung ist gerade nicht eingerichtet.", 500);

  let stripeResponse: Response;
  try {
    stripeResponse = await fetch(
      `https://api.stripe.com/v1/payment_intents/${bestellung.stripe_payment_intent_id}/capture`,
      {
        method: "POST",
        headers: {
          Authorization: "Basic " + btoa(stripeSecret + ":"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ amount_to_capture: String(betrag_cent) }),
      }
    );
  } catch {
    return fehler("Stripe war nicht erreichbar.", 502);
  }

  const payment = await stripeResponse.json();
  if (!stripeResponse.ok) {
    return fehler(payment?.error?.message || "Stripe-Fehler.", 400);
  }

  const { error: updateFehler } = await supabase
    .from("bestellungen")
    .update({
      tatsaechliches_gewicht_kg: tatsaechliches_gewicht_kg ?? null,
      abgerechneter_betrag_cent: betrag_cent,
      bezahlt: true,
    })
    .eq("id", bestellung_id);

  if (updateFehler) {
    return fehler("Zahlung wurde abgebucht, aber das Speichern ist fehlgeschlagen: " + updateFehler.message, 500);
  }

  return new Response(JSON.stringify({ ok: true, betrag_cent }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
