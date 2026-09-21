# Uncle Laundry

Wäscheservice mit Abholung und Lieferung. Kunden bestellen online, wir holen die Wäsche ab, waschen sie und bringen sie zurück.

**Stand:** Kundensicht im Browser mit Kundenkonten (Supabase). Registrierung, Login, 10 % Erstbestellungs-Rabatt, Sackgrößen, Spezialwäsche und Foto-Upload. Dashboard, Fahrer-Ansicht und Online-Zahlung folgen.

## Aufbau des Repos

| Ordner | Inhalt |
| --- | --- |
| `web/customer/` | Kundensicht im Browser: Bestellung aufgeben (`index.html`), Einstellungen (`config.js`) |
| `docs/` | Konzept, Roadmap und getroffene Entscheidungen |

Weitere Ordner legen wir an, sobald es Inhalt dafür gibt:

| Ordner | Inhalt |
| --- | --- |
| `web/dashboard/` | Unternehmens-Dashboard: Bestellungen und Kuriere einsehen |
| `web/driver/` | Ansicht für Fahrer und Abholpersonal |
| `backend/` | Server und Datenbank |
| `apps/ios/`, `apps/android/` | Mobile Apps |

## Kundensicht ausprobieren

`web/customer/index.html` per Doppelklick im Browser öffnen. Die Datei `config.js` muss im selben Ordner liegen. Es werden keine externen Dateien oder Schriftarten geladen.

Der Kunde wählt einen Sack (S, M oder L) und optional Spezialwäsche (z. B. Hemden, Anzüge, Kleider) und gibt Adresse und Termin an. Sackwäsche wird nach dem Gewicht abgerechnet, das der Fahrer bei der Abholung wiegt; Spezialwäsche zum festen Stückpreis. Optional kann er ein Foto beifügen, z. B. von einem Fleck; da WhatsApp- und E-Mail-Links keine Dateien anhängen können, muss er das Foto beim Absenden manuell anhängen. Die Bestellung geht per WhatsApp oder E-Mail raus. Die Online-Zahlung und der automatische Foto-Versand folgen mit dem Backend.

## Einrichten

### 1. Supabase-Projekt (einmalig)

1. Projekt bei [supabase.com](https://supabase.com) anlegen, Region Frankfurt.
2. Im SQL Editor den Inhalt von `supabase_setup.sql` einfügen und ausführen. Das legt Tabellen, Fotospeicher und Zugriffsregeln an.
3. Unter „Project Settings“ → „API“ die *Project URL* und den *anon public*-Schlüssel kopieren.

### 2. `web/customer/config.js`

- `supabaseUrl`, `supabaseAnonKey`: die Werte aus Schritt 1
- `erstbestellungRabattProzent`: Rabatt auf die erste Bestellung (Standard: 10)
- `preisProKgCent`, `mindestbetragCent`, `abholgebuehrCent`: Preise in Cent (Beispielwerte, bitte ersetzen)
- `saecke`: Namen, Höchstgewichte und Vergleichstexte der Säcke
- `spezialwaesche`: Namen und Stückpreise der Spezialwäsche-Positionen
- `rueckgabeNachTagen`, `sonntagsGeschlossen`, `zeitfenster`
- `plzPraefixe`: Liefergebiet einschränken, zum Beispiel `["44"]`. Leer heißt keine Einschränkung.
- `testphaseHinweis` und `mehrgewichtHinweis`: Hinweise auf der Seite. Leer lassen blendet sie aus.

`whatsapp` und `email` sind nur noch ein stiller Fallback für später und werden aktuell nirgends benutzt.

## Arbeitsweise

- Ordner- und Dateinamen im Code auf Englisch und in Kleinbuchstaben, Dokumentation auf Deutsch
- Aufgaben stehen in `docs/roadmap.md`, Beschlüsse in `docs/entscheidungen.md`
- Commit-Nachrichten kurz und mit Bereich, zum Beispiel: `customer: Zeitfenster für Rückgabe ergänzt`
