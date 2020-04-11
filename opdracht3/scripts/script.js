/*jshint esversion: 6 */
/*jshint sub:true*/

// Alle querySelectors
const main = document.querySelector('main');
const sectieRechts = document.querySelector('.rechts');
const myH2 = document.querySelector('.links').getElementsByTagName('h2'); // h2 binnen de section 'links'
const weerWolk = document.querySelector('.links').getElementsByTagName('img'); // img binnen de section 'links'
const huidigTemp = document.querySelector('.temperatuur-huidig');
const huidigOms = document.querySelector('.omschrijving-huidig');
const knopVerwachting = document.querySelector('button[name="verwachting"]');  // knop om weersverwachting te bekijken
const deLijst = document.querySelector('.list-container');
const popup = document.querySelector('.popup');
const popupContent = document.querySelector('.popup-content');
const knopClose = document.querySelector('.close');

// Functie aanroepen om locatie toegang te verkrijgen (browser popup verschijnt)
krijgLocatie();

function krijgLocatie() {

  // Vaststellen wat de status is van de Locatie pop-up
  // Bron: via https://developer.mozilla.org/en-US/docs/Web/API/PermissionStatus
  navigator.permissions.query({name:'geolocation'}).then(function(result) {

    toestemming(result); // voer functie 'toestemming' uit en gebruik als parameter het resultaat
    result.onchange = function() { //Bij wijziging opnieuw de functie uitvoeren
       toestemming(result);
     };
  });

   function toestemming(result) {
   if (result.state == 'granted') { // Als toestemming is gegeven: Loading State

     console.log('GRANTED');
     myH2[0].textContent = 'Locatie bepalen...';
     weerWolk[0].src = 'img/doemaarladen.gif'; // loading spinner
     huidigOms.textContent = 'Bezig met het vaststellen van je locatie, zodat we het actuele weerbericht kunnen tonen.';

   } else if (result.state == 'prompt') { // Als toestemming wordt gevraagd

     console.log('PROMPTED');

   } else if (result.state == 'denied') { // Als locatietoegang wordt geweigerd een Error state

     console.log('DENIED');
     myH2[0].textContent = 'Locatie geweigerd';
     weerWolk[0].src = 'img/location-off.png';
     huidigTemp.textContent = '';
     huidigOms.textContent = 'Je hebt locatietoegang geweigerd, dus we kunnen het weerbericht op je huidige locatie niet tonen. Bekijk hiernaast het weer in Wereldsteden.';
     knopVerwachting.classList.add('verberg');

   }
 }

  // Vaststellen van de locatie van de gebruiker
  // wordt alleen uitgevoerd als gebruiker toestemming heeft gegeven voor locatie
  // Bron: via https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
  navigator.geolocation.getCurrentPosition(function(position) {

    lat = position.coords.latitude.toFixed(3); // Latitude Coordinaten afronden tot 3 cijfers achter komma
    long = position.coords.longitude.toFixed(3); // Longitude Coordinaten afronden tot 3 cijfers achter komma

    console.log(lat);
    console.log(long);

      // API URL van OpenWeatherMap.org voor huidige locatie
      // Verbinding met API, via: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON
      let apiGeoURL = 'https://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+long+'&units=metric&lang=nl&appid=8a2ec9288a2410007fc828bb57ee62b6';
      console.log(apiGeoURL);
      let request = new XMLHttpRequest();

      request.open('GET', apiGeoURL);
      request.responseType = 'json';
      request.send();

      request.onload = function() {
        const alleData = request.response;
        console.log(request.response);
        toonData(alleData);
      };

      function toonData(jsonObj) {
      const data = jsonObj;

      myH2[0].textContent = data.city.name; //Naam van vastgestelde Plaats

      const weerGPS = jsonObj['list'];

      weerWolk[0].src = 'https://openweathermap.org/img/wn/'+weerGPS[0].weather[0].icon+'@2x.png'; //Weer icon via OpenWeatherMap.org
      huidigOms.textContent = weerGPS[0].weather[0].description; //Omschrijving van weer
      huidigTemp.textContent = weerGPS[0].main.temp.toFixed(1)+' °C'; //Temperatuur afronden tot 1 cijfer achter komma
      knopVerwachting.classList.remove('verberg'); //Knop 'weersverwachting' komt tevoorschijn

      // Titel in popup
      const h1 = document.createElement('h1');
      h1.textContent = 'Weer in '+data.city.name+' voor de komende dagen';

      popupContent.appendChild(h1); // h1 wordt binnen popup geplaatst

      for (let i = 0; i < weerGPS.length; i++) { // For loop voor weer data ná wat al getoond is

        /////////////////////////////////////////////////////////////////////////////////////////////////
        // Weerdata van OpenWeatherMap geeft datum en tijd in UNIX formaat
        // Omzetten naar 'normale' tijd, code via:
        // https://coderrocketfuel.com/article/convert-a-unix-timestamp-to-a-date-in-vanilla-javascript
        /////////////////////////////////////////////////////////////////////////////////////////////////

        const milliseconds = weerGPS[i].dt * 1000; //UNIX tijd omzetten naar milliseconden
        const dateObject = new Date(milliseconds); //Datum object aanmaken

        const dag = dateObject.toLocaleString("nl-NL", {weekday: "long"}); // Conveteren naar naam van dag (maandag)
        const maand = dateObject.toLocaleString("nl-NL", {month: "long"}); // Conveteren naar naam van maand (maart)
        const dagGetal = dateObject.toLocaleString("nl-NL", {day: "numeric"}); // Conveteren naar nummer van dag (9)
        const uur = dateObject.toLocaleString("nl-NL", {hour: "numeric"}); // Conveteren naar uur (12)

        const ul = document.createElement('ul'); //UL lijst met weerdata in popup
        const li = document.createElement('li'); // De list-items (momenten van weer)
        const img = document.createElement('img'); // Afbeelding van weer wolk
        const pTemp = document.createElement('p'); // Temperatuur
        const h3Dat = document.createElement('h3'); // Datum van getoonde weerbericht
        const pMoment = document.createElement('p'); // Is ochtend/middag/avond
        const pBeschrijving = document.createElement('p'); // Beschrijving van weer

        // Iedere UL krijgt een class met maand en dag (april12),
        // zodat list items van dezelfde datum in dezelfde UL kunnen worden geplaatst
        ul.classList.add(maand+dagGetal);

        img.src = 'https://openweathermap.org/img/wn/'+weerGPS[i].weather[0].icon+'@2x.png'; //Weer icon via OpenWeatherMap.org
        img.alt = weerGPS[i].weather[0].description+' icon afbeelding';

        pTemp.textContent = weerGPS[i].main.temp.toFixed(1)+' °C'; //Temperatuur
        pTemp.classList.add("temperatuur-huidig");

        pBeschrijving.textContent = weerGPS[i].weather[0].description; //Omschrijving van het weer
        pBeschrijving.classList.add("omschrijving-huidig");

        h3Dat.textContent = dag+' '+dagGetal+' '+maand; // Datum van weerbericht

        pMoment.classList.add("grootBold");

        // OpenWeatherMap geeft de weerdata van 5 dagen verdeeld per 3 uur. Dat zijn 40 weerberichten.
        // Ik wil alleen het weer van de ochtend, middag en dan de avond
        // dat is 8, 14 en 20 uur (in zomertijd) en 7, 13 en 19 uur (in wintertijd)

        // Daarnaast wil ik dat er alleen een UL wordt gemaakt, als er nog
        // geen zelfde UL is. Dus wordt er met hierIn gekeken of er al een
        // UL is met dezelfde class (van de datum)

        const hierIn = document.querySelector('.'+maand+dagGetal);

        if (hierIn && uur == 07 || hierIn && uur == 08){ // Er bestaat al een UL voor deze datum, dus geen nieuwe UL maken
          pMoment.textContent = 'Ochtend';
          li.appendChild(pMoment); // Weer data wordt binnen List Item geplaatst
          li.appendChild(img);
          li.appendChild(pTemp);
          li.appendChild(pBeschrijving);
          hierIn.appendChild(li); // List item wordt in bestaande UL voor die dag geplaatst
        }
        else if (hierIn && uur == 13 || hierIn && uur == 14){ // Er bestaat al een UL voor deze datum, dus geen nieuwe UL maken
          pMoment.textContent = 'Middag';
          li.appendChild(pMoment); // Weer data wordt binnen List Item geplaatst
          li.appendChild(img);
          li.appendChild(pTemp);
          li.appendChild(pBeschrijving);
          hierIn.appendChild(li); // List item wordt in bestaande UL voor die dag geplaatst
        }
        else if (hierIn && uur == 19 || hierIn && uur == 20){ // Er bestaat al een UL voor deze datum, dus geen nieuwe UL maken
          pMoment.textContent = 'Avond';
          li.appendChild(pMoment); // Weer data wordt binnen List Item geplaatst
          li.appendChild(img);
          li.appendChild(pTemp);
          li.appendChild(pBeschrijving);
          hierIn.appendChild(li); // List item wordt in bestaande UL voor die dag geplaatst
        }
        else if (hierIn == null && uur == 07 || hierIn == null && uur == 08) { // Er is nog geen UL voor deze datum, dus maak een UL aan en een titel
          popupContent.appendChild(h3Dat); // De titel van deze dag wordt in de popup geplaatst
          popupContent.appendChild(ul); // De ul wordt geplaatst in de popup
          pMoment.textContent = 'Ochtend';
          li.appendChild(pMoment); // Weer data wordt binnen List Item geplaatst
          li.appendChild(img);
          li.appendChild(pTemp);
          li.appendChild(pBeschrijving);
          ul.appendChild(li);
        }
        else if (hierIn == null && uur == 13 || hierIn == null && uur == 14) { // Er is nog geen UL voor deze datum, dus maak een UL aan en een titel
          popupContent.appendChild(h3Dat); // De titel van deze dag wordt in de popup geplaatst
          popupContent.appendChild(ul); // De ul wordt geplaatst in de popup
          pMoment.textContent = 'Middag';
          li.appendChild(pMoment); // Weer data wordt binnen List Item geplaatst
          li.appendChild(img);
          li.appendChild(pTemp);
          li.appendChild(pBeschrijving);
          ul.appendChild(li);
        }
        else if (hierIn == null && uur == 19 || hierIn == null && uur == 20) { // Er is nog geen UL voor deze datum, dus maak een UL aan en een titel
          popupContent.appendChild(h3Dat); // De titel van deze dag wordt in de popup geplaatst
          popupContent.appendChild(ul); // De ul wordt geplaatst in de popup
          pMoment.textContent = 'Avond';
          li.appendChild(pMoment); // Weer data wordt binnen List Item geplaatst
          li.appendChild(img);
          li.appendChild(pTemp);
          li.appendChild(pBeschrijving);
          ul.appendChild(li);
        }
        else {
          console.log(hierIn);
        }
      }
    }
}
);
}

// API URL van OpenWeatherMap.org voor meerdere locaties
// Werkt via een nummer dat iedere stad aanduid
// Verbinding met API, via: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON

let apiMeerdere = 'https://api.openweathermap.org/data/2.5/group?id=2759794,2988507,3128760,5128581,5368361,2950159&units=metric&lang=nl&appid=8a2ec9288a2410007fc828bb57ee62b6';
let request = new XMLHttpRequest();

request.open('GET', apiMeerdere);
request.responseType = 'json';
request.send();

request.onload = function() {
  const alHetWeer = request.response;
  console.log(request.response);
  toonWeer(alHetWeer);
};

function toonWeer(jsonObj) {
  const weerSteden = jsonObj.list;

  // For loop voor het aanmaken van de List Items met de diverse steden
  for (let i = 0; i < weerSteden.length; i++) {

    // Elementen worden aangemaakt
    const li = document.createElement('li');
    const imgWeer = document.createElement('img');
    const h3 = document.createElement('h3');
    const pWeerInfo = document.createElement('p');
    const pWeerTemp = document.createElement('p');

    li.classList.add('list-element'); // List item krijgt class 'list-element'

    imgWeer.draggable = false;
    imgWeer.src = 'https://openweathermap.org/img/wn/'+weerSteden[i].weather[0].icon+'.png';
    imgWeer.alt = weerSteden[i].weather[0].description+' icoon afbeelding';

    h3.textContent = weerSteden[i].name;

    pWeerInfo.textContent = weerSteden[i].weather[0].description;

    pWeerTemp.classList.add('grootBold');
    pWeerTemp.textContent = weerSteden[i].main.temp.toFixed()+' °C'; // Afronden tot geheel getal

    li.appendChild(imgWeer); // Element wordt binnen List Item geplaatst
    li.appendChild(h3);
    li.appendChild(pWeerInfo);
    li.appendChild(pWeerTemp);
    deLijst.appendChild(li); // List item wordt binnen de UL-list geplaatst
  }
}

// Tonen en verbergen van de Popup

knopVerwachting.addEventListener("click", function(){ // Popup tonen na drukken op knop 'Weersverwachting'
  popup.style.display = "block";
});

knopClose.addEventListener("click", function(){ // Popup  sluiten na drukken op de 'close' knop
  popup.style.display = "none";
});

window.onkeydown = function(e){ //Popup sluiten met het toetsenbord
    var toets = e.keyCode;
    if(toets===27){ //ESC-toets
      popup.style.display = "none";
    }
  };

window.onclick = function(event) { // Popup sluiten door ergens anders (buiten de popup) te drukken
  if (event.target == popup) {
    popup.style.display = "none";
  }
};
