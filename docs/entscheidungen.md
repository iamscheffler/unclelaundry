# Entscheidungen

Hier steht, was wir entschieden haben und warum. Neue Einträge oben.

## 22.09.2026 (Konto statt WhatsApp/E-Mail)

- **Weg von WhatsApp- und E-Mail-Bestellung, hin zu echten Kundenkonten.** Kunden registrieren sich oder melden sich an, bevor sie bestellen.
- **10 % Rabatt auf die erste Bestellung** für neu registrierte Kunden. Der Rabatt wird automatisch abgezogen und ist nach der ersten Bestellung verbraucht.
- **Backend: Supabase**, Region Frankfurt. Bietet Login, Datenbank und Dateispeicher in einem, ohne eigenen Server. Details siehe `docs/konzept.md`.
- **Bestellungen landen direkt in der Datenbank** (Tabelle `bestellungen`), nicht mehr als Nachricht. Das Foto wird jetzt automatisch mit hochgeladen, kein manueller Anhang mehr nötig.
- **Zugriff ist abgesichert über Regeln in der Datenbank (Row Level Security):** Jeder Kunde sieht nur seine eigenen Daten. Das einmalige Setup steht in `supabase_setup.sql`.
- **Die Online-Zahlung (Kartenreservierung) ist noch nicht Teil davon**, das bleibt ein eigener, späterer Schritt.

## 22.09.2026 (Foto-Upload)

- **Foto-Feld bei den Hinweisen.** Kunden können ein Foto aufnehmen oder aus der Galerie wählen, z. B. von einem Fleck, mit Vorschau in der Seite.
- **Kein automatischer Versand des Fotos.** WhatsApp- und E-Mail-Links können technisch keine Dateien anhängen, das kann nur die jeweilige App selbst. Der Kunde wird beim Absenden darauf hingewiesen, das Foto manuell anzuhängen.
- **Mit dem Backend** kann das Foto direkt hochgeladen und der Bestellung zugeordnet werden, ohne diesen Zwischenschritt.

## 22.09.2026 (Spezialwäsche)

- **Spezialwäsche als eigene Kategorie, zusätzlich zu den Säcken.** Hemden, Blusen, Anzüge, Kostüme, Kleider, Röcke, Mäntel, Jacken, Krawatten, Pullover/Feinwäsche und Daunendecken/-jacken werden pro Stück zum festen Preis berechnet, nicht nach Gewicht.
- **Bettwäsche bleibt bei den Säcken (S/M/L)**, sie zählt nicht zur Spezialwäsche.
- **Grund für Stückpreise:** Diese Teile brauchen individuelle Behandlung (Bügeln, Handwäsche, Spezialreinigung) und haben einen bekannten Preis. Keine Wiege-Unsicherheit wie bei der Sackwäsche.

## 21.09.2026 (Abrechnung und Zahlung)

- **Abrechnung nach Gewicht.** Die Preise pro Kilogramm sind für Kunden auf der Website sichtbar. Der Kunde muss seine Wäsche weder sortieren noch wiegen.
- **Der Fahrer wiegt bei der Abholung.** Er nutzt einen Abholsack bzw. Behälter und eine Digitalwaage und trägt das Gewicht in die App ein, noch bevor der Kunde es sieht.
- **Kunde wählt eine Sackgröße statt eines Gewichts.** Die Größen (z. B. bis 6, 10 oder 15 kg) geben eine grobe Orientierung und bestimmen den Höchstbetrag.
- **Bezahlung bei der Bestellung per Karte oder PayPal.** Das schafft Verbindlichkeit. Vorgesehen ist eine Reservierung des Höchstbetrags bei der Bestellung. Nach dem Wiegen wird nur der tatsächliche Betrag abgebucht, der Rest wird freigegeben.
- **Zahlungsmittel wird für Nachbelastungen gespeichert.** Damit lässt sich Mehrgewicht abrechnen, und eine Ausfallgebühr wäre möglich. Beides muss in den AGB stehen.
- **Für Zahlungen braucht es ein Backend.** Die Schlüssel des Zahlungsdienstes dürfen nicht im öffentlichen Code stehen. Die Fahrer-Ansicht zum Wiegen wird damit früher wichtig.
- **Bis dahin läuft eine Testphase.** Bestellungen kommen als Nachricht per WhatsApp oder E-Mail, ohne Online-Zahlung.
- **Einstellungen liegen in `web/customer/config.js`.** So bleiben Preise und Kontaktdaten erhalten, wenn `index.html` aktualisiert wird.

## 21.09.2026 (Start)

- **Start als eigener Service, Architektur marktplatzfähig.** Zuerst gibt es einen Anbieter. Die Technik wird so angelegt, dass später mehrere Wäscherei-Partner möglich sind.
- **Kundensicht zuerst.** Sie ist der Kern des Geschäfts und legt fest, welche Daten ein Auftrag enthält. Die Betreiber- und Fahrer-Ansichten bauen darauf auf.
- **Bestellung anfangs ohne Backend.** Die Bestellung kommt als fertige Nachricht per WhatsApp oder E-Mail an. Erste Aufträge werden von Hand bearbeitet, um die Nachfrage zu prüfen.
- **Namen im Code englisch, Dokumentation deutsch.** Das erleichtert spätere Erweiterungen auf weitere Länder und die Zusammenarbeit mit Entwicklern.
