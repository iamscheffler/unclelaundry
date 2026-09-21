# Uncle Laundry

Wäscheservice mit Abholung und Lieferung. Kunden bestellen online, wir holen die Wäsche ab, waschen sie und bringen sie zurück.

**Stand:** Kundensicht im Browser (erste Version). Ein Backend, Dashboard und Apps folgen.

## Aufbau des Repos

| Ordner | Inhalt |
| --- | --- |
| `web/customer/` | Kundensicht im Browser: Bestellung aufgeben |
| `docs/` | Konzept, Roadmap und getroffene Entscheidungen |

Weitere Ordner legen wir an, sobald es Inhalt dafür gibt:

| Ordner | Inhalt |
| --- | --- |
| `web/dashboard/` | Unternehmens-Dashboard: Bestellungen und Kuriere einsehen |
| `web/driver/` | Ansicht für Fahrer und Abholpersonal |
| `backend/` | Server und Datenbank |
| `apps/ios/`, `apps/android/` | Mobile Apps |

## Kundensicht ausprobieren

`web/customer/index.html` per Doppelklick im Browser öffnen. Es werden keine externen Dateien oder Schriftarten geladen.

## Einrichten

Im Block `CONFIG` in `web/customer/index.html` stehen Preise, Zeiten und Kontaktdaten:

- `whatsapp` und/oder `email`: Ohne eines von beiden erscheint kein Bestellen-Button.
- `leistungen`: Namen, Beschreibungen und Preise in Cent (Beispielwerte, bitte ersetzen)
- `mindestbestellwertCent`, `abholgebuehrCent`, `abholgebuehrEntfaelltAbCent`
- `rueckgabeNachTagen`, `sonntagsGeschlossen`, `zeitfenster`
- `plzPraefixe`: Liefergebiet einschränken, zum Beispiel `["44"]`. Leer heißt keine Einschränkung.

## Arbeitsweise

- Ordner- und Dateinamen im Code auf Englisch und in Kleinbuchstaben, Dokumentation auf Deutsch
- Aufgaben stehen in `docs/roadmap.md`, Beschlüsse in `docs/entscheidungen.md`
- Commit-Nachrichten kurz und mit Bereich, zum Beispiel: `customer: Zeitfenster für Rückgabe ergänzt`
