# Konzept: Uncle Laundry

## Idee

Ein Wäscheservice mit Abholung und Lieferung. Kunden bestellen online, Fahrer holen die Wäsche ab, sie wird gewaschen und zurückgebracht. Das Prinzip ähnelt einem Lieferdienst, nur für Wäsche.

## Rollen

| Rolle | Aufgabe |
| --- | --- |
| Kunde | Sack wählen, Adresse und Termin angeben, bei der Bestellung bezahlen |
| Fahrer / Abholpersonal | Wäsche abholen, wiegen, Gewicht in die App eintragen, zurückbringen |
| Unternehmen (Dashboard) | Bestellungen, Gewichte, Zahlungen und Fahrer im Blick behalten |

## Ablauf (Entwurf)

1. Der Kunde registriert sich (10 % Rabatt auf die erste Bestellung) oder meldet sich an. Dann sieht er die Preise pro Kilogramm und wählt einen Sack, der ungefähr passt. Zusätzlich kann er Spezialwäsche (z. B. Hemden, Anzüge, Kleider) einzeln zum festen Stückpreis dazubuchen.
2. Er gibt Adresse und Termin an und bezahlt per Karte oder PayPal. Reserviert wird der Höchstbetrag des Sacks.
3. Der Fahrer holt die Wäsche im Abholsack ab, wiegt sie mit der Digitalwaage und trägt das Gewicht in die App ein.
4. Das System bucht den tatsächlichen Betrag ab. Ein nicht benötigter Rest der Reservierung wird freigegeben.
5. Die Wäsche wird gewaschen und im gewählten Zeitfenster zurückgebracht.

Mögliche Status einer Bestellung: Neu, Bezahlung reserviert, Abgeholt und gewogen, In Bearbeitung, Bereit zur Rückgabe, Zurückgebracht.

## Preise und Bezahlung

- Zwei Arten von Positionen: Sackwäsche wird nach dem gewogenen Gewicht abgerechnet (mit Mindestbetrag), Spezialwäsche (Hemden, Anzüge, Kleider, Röcke, Mäntel, Krawatten, Feinwäsche, Daunen) zum festen Preis pro Stück. Bettwäsche zählt zur normalen Sackwäsche.
- Abgerechnet wird nach dem gewogenen Gewicht, mit einem Mindestbetrag pro Abholung.
- Bei der Bestellung wird der Höchstbetrag der gewählten Sackgröße reserviert. Reservierungen halten bei Karten in der Regel etwa sieben Tage, bei PayPal länger. Das ist bei kurzer Vorlaufzeit unkritisch.
- Wiegt die Wäsche mehr als der Sack fasst, wird die Differenz mit dem gespeicherten Zahlungsmittel nachbelastet oder ein weiterer Sack verwendet.
- SEPA-Lastschrift eignet sich für dieses Modell nicht. Zum Start gibt es Karte und PayPal.
- Zahlungen brauchen die geplante Anbindung an einen Zahlungsdienst wie Stripe, das steht noch aus.
- Konten, Bestellungen und Fotospeicher laufen über Supabase (Region Frankfurt). Einmaliges Setup in `supabase_setup.sql`.
- Rechtliches vor dem Start klären: AGB, Widerrufsbelehrung, klare Preisangabe, Button „zahlungspflichtig bestellen“ und Datenschutz.

## Ausbaustufen

1. Start als eigener Service mit einem Anbieter.
2. Später Marktplatz mit mehreren Wäscherei-Partnern. Die Architektur wird von Anfang an so angelegt, dass jede Bestellung zu einem Anbieter gehört.
3. Mehrere Länder, Start mit Deutschland. Texte und Preise sollen sich später pro Land austauschen lassen.

## Plattformen

Zuerst Browser, danach iOS und Android.

## Offene Fragen

- Kilopreis und Mindestbetrag (in der Kundensicht stehen Beispielwerte)
- Sackgrößen und ihre Höchstgewichte
- Regel bei Mehrgewicht: zweiter Sack, Nachbelastung oder Deckelung
- Ausfallgebühr, wenn niemand die Wäsche übergibt
- Zahlungsdienst (Karte und PayPal)
- Liefergebiet und Postleitzahlen
- Wer wäscht: eigene Maschinen oder Partner-Wäscherei
