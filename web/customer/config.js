/* ------------------------------------------------------------------
   EINSTELLUNGEN für die Kundensicht
   Hier änderst du Preise, Sackgrößen, Zeiten und Kontaktdaten.
   Beträge stehen in Cent (490 = 4,90 €).
   Achte darauf, dass Anführungszeichen und Kommas stehen bleiben.
   ------------------------------------------------------------------ */
const CONFIG = {
  name: "Uncle Laundry",

  // Supabase-Projekt: für Registrierung, Login und Bestellungen.
  supabaseUrl: "https://tjxwwnpnsdhxvfgsgozx.supabase.co",
  supabaseAnonKey: "sb_publishable_GoLQ3A6V9fud5SKo2KXnaA_DFTknNLg",
  erstbestellungRabattProzent: 10,

  // Fallback, nur falls Supabase einmal nicht erreichbar ist. Ohne Eintrag
  // erscheint der Hinweis "Bestellung kann gerade nicht gesendet werden".
  whatsapp: "",   // Ländervorwahl + Nummer, nur Ziffern, z. B. "491701234567"
  email: "",      // z. B. "bestellung@deine-domain.de"

  // Preise (Beispielwerte, bitte durch deine echten Preise ersetzen)
  preisProKgCent: 490,        // Preis pro Kilogramm
  mindestbetragCent: 2000,    // Mindestbetrag pro Abholung
  abholgebuehrCent: 0,        // 0 = Abholung und Rückgabe kostenlos

  // Abholsäcke (Beispielwerte). Der Kunde wählt, der Fahrer wiegt bei der Abholung.
  maxProSack: 5,              // so viele Säcke des gleichen Typs kann ein Kunde wählen
  saecke: [
    { id: "s", name: "Sack S", maxKg: 6,  hilfe: "Etwa eine Waschmaschinenladung." },
    { id: "m", name: "Sack M", maxKg: 10, hilfe: "Etwa zwei Waschmaschinenladungen." },
    { id: "l", name: "Sack L", maxKg: 15, hilfe: "Etwa drei Waschmaschinenladungen." }
  ],

  // Spezialwäsche: einzelne Teile, die pro Stück berechnet werden (nicht nach Gewicht).
  spezialwaesche: [
    { id: "hemd",     name: "Hemd / Bluse",              preisCent: 320 },
    { id: "anzug",    name: "Anzug / Kostüm",             preisCent: 1200 },
    { id: "kleid",    name: "Kleid",                      preisCent: 900 },
    { id: "rock",     name: "Rock",                       preisCent: 500 },
    { id: "mantel",   name: "Mantel / Jacke",             preisCent: 1400 },
    { id: "krawatte", name: "Krawatte",                   preisCent: 300 },
    { id: "pullover", name: "Pullover (Feinwäsche)",      preisCent: 600 },
    { id: "daune",    name: "Daunendecke / Daunenjacke",  preisCent: 1800 }
  ],
  maxProSpezialteil: 20,  // höchste Anzahl pro Position

  // Hinweise, die auf der Seite erscheinen. Leer lassen ("") blendet sie aus.
  mehrgewichtHinweis: "Passt mehr Wäsche hinein, als du angegeben hast, sprechen wir das bei der Abholung mit dir ab.",
  testphaseHinweis: "Testphase: Die Bezahlung erfolgt noch nicht online. Wir melden uns nach deiner Bestellung bei dir.",

  // Termine
  rueckgabeNachTagen: 2,      // frühester Rückgabetag nach der Abholung
  sonntagsGeschlossen: true,
  zeitfenster: ["08–10 Uhr", "10–12 Uhr", "12–14 Uhr", "14–16 Uhr", "16–18 Uhr", "18–20 Uhr"],

  // Liefergebiet: Postleitzahlen-Anfänge, z. B. ["44"]. Leer = keine Einschränkung.
  plzPraefixe: []
};
