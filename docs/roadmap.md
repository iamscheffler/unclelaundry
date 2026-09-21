# Roadmap

## Erledigt

- [x] GitHub-Repo angelegt und mit Claude verbunden
- [x] Kundensicht, erste Version: Bestellung mit Adresse, Termin und Wäschezettel
- [x] Kundensicht, zweite Version: Sackgrößen, Preis pro Kilogramm, Höchstbetrag, Einstellungen in `config.js`
- [x] Kundensicht, dritte Version: Spezialwäsche pro Stück (Hemden, Anzüge, Kleider u. a.)
- [x] Kundensicht, vierte Version: Foto-Feld bei den Hinweisen (Vorschau, manueller Anhang beim Versand)
- [x] Kundensicht, fünfte Version: Registrierung, Login und 10 % Rabatt auf die erste Bestellung über Supabase; Bestellung landet direkt in der Datenbank statt per WhatsApp/E-Mail

## Als Nächstes

- [ ] `supabase_setup.sql` einmalig im Supabase-Projekt ausführen
- [ ] Echte Preise in `web/customer/config.js` eintragen
- [ ] Registrierung, Login und Bestellung mit einem echten Test-Konto ausprobieren
- [ ] Sackgrößen festlegen (Höchstgewichte und Vergleichstexte)
- [ ] Preise für Spezialwäsche prüfen und ggf. weitere Positionen ergänzen
- [ ] Kundensicht mit einigen Testkunden ausprobieren und Rückmeldungen sammeln
- [ ] Zahlungsdienst auswählen (Karte und PayPal, Reservierung mit späterer Abbuchung)
- [ ] Impressum, Datenschutzerklärung, AGB und Widerrufsbelehrung ergänzen

## Danach

- [ ] Zahlungsdienst anbinden: Höchstbetrag bei Bestellung reservieren, nach dem Wiegen abbuchen
- [ ] Fahrer-Ansicht: Abholung bestätigen, Gewicht eintragen
- [ ] Unternehmens-Dashboard
- [ ] Kundensicht mit Online-Zahlung statt WhatsApp
- [ ] iOS- und Android-Apps
- [ ] Erweiterung zum Marktplatz mit mehreren Wäscherei-Partnern
