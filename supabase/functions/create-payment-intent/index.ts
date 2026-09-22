// Supabase Edge Function: create-payment-intent
//
// Legt bei Stripe eine Reservierung an (der Betrag wird auf der Karte
// gehalten, aber noch nicht abgebucht). Wird von der Kundensicht
// aufgerufen, kurz bevor der Kunde seine Kartendaten eingibt.
//
// Einrichtung im Supabase-Dashboard:
//   1. "Edge Functions" -> "Deploy a new function" -> "Via Editor"
//   2. Name: create-payment-intent
//   3. Diesen kompletten Code einfügen und "Deploy" klicken.
//   4. Unter "Edge Functions" -> "Secrets" sicherstellen, dass
//      STRIPE_SECRET_KEY dort hinterlegt ist (siehe Anleitung im Chat).

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

  let betrag_cent: unknown;
  try {
    const body = await req.json();
    betrag_cent = body.betrag_cent;
  } catch {
    return fehler("Ungültige Anfrage.");
  }

  if (!Number.isInteger(betrag_cent) || (betrag_cent as number) < 50 || (betrag_cent as number) > 100000) {
    return fehler("Ungültiger Betrag.");
  }

  const authHeader = req.headers.get("Authorization");
  if (!authHeader) return fehler("Nicht angemeldet.", 401);

  // Nutzer aus dem mitgesendeten Login-Token ermitteln, damit die
  // Reservierung eindeutig einem Kunden zugeordnet werden kann.
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: authHeader } } }
  );
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) return fehler("Nicht angemeldet.", 401);

  const stripeSecret = Deno.env.get("STRIPE_SECRET_KEY");
  if (!stripeSecret) return fehler("Zahlung ist gerade nicht eingerichtet.", 500);

  const stripeBody = new URLSearchParams({
    amount: String(betrag_cent),
    currency: "eur",
    "automatic_payment_methods[enabled]": "true",
    capture_method: "manual",
    "metadata[user_id]": userData.user.id,
    "metadata[projekt]": "unclelaundry",
  });

  let stripeResponse: Response;
  try {
    stripeResponse = await fetch("https://api.stripe.com/v1/payment_intents", {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa(stripeSecret + ":"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: stripeBody,
    });
  } catch {
    return fehler("Stripe war nicht erreichbar.", 502);
  }

  const paymentIntent = await stripeResponse.json();

  if (!stripeResponse.ok) {
    return fehler(paymentIntent?.error?.message || "Stripe-Fehler.", 400);
  }

  return new Response(
    JSON.stringify({
      client_secret: paymentIntent.client_secret,
      payment_intent_id: paymentIntent.id,
    }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
});
