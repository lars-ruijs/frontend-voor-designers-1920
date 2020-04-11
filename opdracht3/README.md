# Opdracht 3: Weer applicatie via API

Ik heb een simpele weer applicatie gemaakt die het weer toont van je huidige locatie en van een aantal wereldsteden.
Wanneer je op de knop 'Weersverwachting' drukt, krijg je het weer voor de komende periode in een popup te zien o.b.v. je huidige locatie.

Voor de weerdata heb ik gebruik gemaakt van de API van OpenWeatherMap.

## States
Bij het gedeelte 'Mijn locatie, komend uur:' heb ik states verwerkt die kunnen optreden voor, tijdens en na het vragen van je locatie.
* **Ideal state:** De gebruiker heeft toegang gegeven tot de locatie en het weerbericht wordt getoond.
* **Permission state:** De gebruiker krijgt een popup te zien met de vraag naar locatietoegang. Op de plek waar het weerbericht zou moeten staan, staat uitleg over waarom toestemming nodig is.
* **Loading state:** De gebruiker heeft toegang gegeven tot de locatie en de browser is bezig met het vaststellen van de locatie en/of de API is de weerdata voor deze locatie aan het laden.
* **Error state:** De gebruiker heeft geen toegang gegeven tot de locatie.

## Gebruikte API
[OpenWeatherMap.org](https://openweathermap.org/) als API voor de actuele weerdata
