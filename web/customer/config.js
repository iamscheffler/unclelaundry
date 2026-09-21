/* ------------------------------------------------------------------
   EINSTELLUNGEN fÃ¼r die Kundensicht
   Hier Ã¤nderst du Preise, SackgrÃ¶ÃŸen, Zeiten und Kontaktdaten.
   BetrÃ¤ge stehen in Cent (490 = 4,90 â‚¬).
   Achte darauf, dass AnfÃ¼hrungszeichen und Kommas stehen bleiben.
   ------------------------------------------------------------------ */
const CONFIG = {
  name: "Uncle Laundry",

  // Wohin die Bestellung geschickt wird. Mindestens eines von beiden ausfÃ¼llen.
  whatsapp: "",   // LÃ¤ndervorwahl + Nummer, nur Ziffern, z. B. "491701234567"
  email: "",      // z. B. "bestellung@deine-domain.de"

  // Preise (Beispielwerte, bitte durch deine echten Preise ersetzen)
  preisProKgCent: 490,        // Preis pro Kilogramm
  mindestbetragCent: 2000,    // Mindestbetrag pro Abholung
  abholgebuehrCent: 0,        // 0 = Abholung und RÃ¼ckgabe kostenlos

  // AbholsÃ¤cke (Beispielwerte). Der Kunde wÃ¤hlt, der Fahrer wiegt bei der Abholung.
  maxProSack: 5,              // so viele SÃ¤cke des gleichen Typs kann ein Kunde wÃ¤hlen
  saecke: [
    { id: "s", name: "Sack S", maxKg: 6,  hilfe: "Etwa eine Waschmaschinenladung." },
    { id: "m", name: "Sack M", maxKg: 10, hilfe: "Etwa zwei Waschmaschinenladungen." },
    { id: "l", name: "Sack L", maxKg: 15, hilfe: "Etwa drei Waschmaschinenladungen." }
  ],

  // Hinweise, die auf der Seite erscheinen. Leer lassen ("") blendet sie aus.
  mehrgewichtHinweis: "Passt mehr WÃ¤sche hinein, als du angegeben hast, sprechen wir das bei der Abholung mit dir ab.",
  testphaseHinweis: "Testphase: Die Bezahlung erfolgt noch nicht online. Wir melden uns nach deiner Bestellung bei dir.",

  // Termine
  rueckgabeNachTagen: 2,      // frÃ¼hester RÃ¼ckgabetag nach der Abholung
  sonntagsGeschlossen: true,
  zeitfenster: ["08â€“10 Uhr", "10â€“12 Uhr", "12â€“14 Uhr", "14â€“16 Uhr", "16â€“18 Uhr", "18â€“20 Uhr"],

  // Liefergebiet: Postleitzahlen-AnfÃ¤nge, z. B. ["44"]. Leer = keine EinschrÃ¤nkung.
  plzPraefixe: []
};
