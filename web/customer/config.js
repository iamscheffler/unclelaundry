/* ------------------------------------------------------------------
   EINSTELLUNGEN für die Kundensicht
   Hier änderst du Preise, Sackgrößen, Zeiten und Kontaktdaten.
   Beträge stehen in Cent (490 = 4,90 €).
   Achte darauf, dass Anführungszeichen und Kommas stehen bleiben.
   ------------------------------------------------------------------ */
const CONFIG = {
  name: "Uncle Laundry",

  // Wohin die Bestellung geschickt wird. Mindestens eines von beiden ausfüllen.
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
