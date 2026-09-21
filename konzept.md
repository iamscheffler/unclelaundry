# Konzept: Uncle Laundry

## Idee

Ein Wäscheservice mit Abholung und Lieferung. Kunden bestellen online, Fahrer holen die Wäsche ab, sie wird gewaschen und zurückgebracht. Das Prinzip ähnelt einem Lieferdienst, nur für Wäsche.

## Rollen

| Rolle | Aufgabe |
| --- | --- |
| Kunde | Bestellung aufgeben: Leistungen, Adresse, Abholtermin |
| Unternehmen (Dashboard) | Bestellungen und Kuriere einsehen |
| Fahrer / Abholpersonal | Abholungen und Lieferungen erledigen |

## Ablauf (Entwurf)

1. Der Kunde stellt seine Bestellung zusammen.
2. Ein Fahrer holt die Wäsche zum gewählten Termin ab.
3. Die Wäsche wird gewaschen.
4. Ein Fahrer bringt sie im gewählten Zeitfenster zurück.

Mögliche Status einer Bestellung: Neu, Abholung geplant, Abgeholt, In Bearbeitung, Bereit zur Rückgabe, Zurückgebracht.

## Ausbaustufen

1. Start als eigener Service mit einem Anbieter.
2. Später Marktplatz mit mehreren Wäscherei-Partnern. Die Architektur wird von Anfang an so angelegt, dass jede Bestellung zu einem Anbieter gehört.
3. Mehrere Länder, Start mit Deutschland. Texte und Preise sollen sich später pro Land austauschen lassen.

## Plattformen

Zuerst Browser, danach iOS und Android.

## Offene Fragen

- Preismodell: nach Kilogramm, nach Stück oder gemischt (die Kundensicht enthält Beispielpreise)
- Liefergebiet und Postleitzahlen
- Zahlungsart und Zeitpunkt der Zahlung
- Wer wäscht: eigene Maschinen oder Partner-Wäscherei
- Mindestbestellwert und Abholgebühr
