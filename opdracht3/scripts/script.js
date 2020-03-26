/*jshint esversion: 6 */
/*jshint sub:true*/

const main = document.querySelector('main');
const sectieRechts = document.querySelector('.rechts');
const myH2 = document.querySelector('.links').getElementsByTagName('h2');
const weerWolk = document.querySelector('.links').getElementsByTagName('img');
const huidigTemp = document.querySelector('.temperatuur-huidig');
const huidigOms = document.querySelector('.omschrijving-huidig');
const knopBilt = document.querySelector('button[name="anderweer"]');
const knopVerwachting = document.querySelector('button[name="verwachting"]');
const deLijst = document.querySelector('#dragable-list');

krijgLocatie();

function krijgLocatie() {

  // Vaststellen wat de status is van de Locatie pop-up
  // via https://developer.mozilla.org/en-US/docs/Web/API/PermissionStatus
  navigator.permissions.query({name:'geolocation'}).then(function(result) {
    toestemming(result);
    result.onchange = function() { //Bij wijziging opnieuw de functie uitvoeren
       toestemming(result);
     };
  });

   function toestemming(result) {
   if (result.state == 'granted') { // Als toestemming is gegeven: Loading State

     console.log('GRANTED');
     myH2[0].textContent = 'Locatie bepalen...';
     weerWolk[0].src = 'img/doemaarladen.gif';
     huidigOms.textContent = 'Bezig met het vaststellen van je locatie, zodat we het actuele weerbericht kunnen tonen.';
     knopBilt.classList.add("verberg");

   } else if (result.state == 'prompt') {

     console.log('PROMPTED');

   } else if (result.state == 'denied') { // Als locatietoegang wordt geweigerd een Error state

     console.log('DENIED');
     myH2[0].textContent = 'Locatie geweigerd';
     weerWolk[0].src = 'img/location-off.png';
     huidigTemp.textContent = '';
     huidigOms.textContent = 'Je hebt locatietoegang geweigerd, dus we kunnen het weerbericht op je huidige locatie niet tonen';
     knopBilt.classList.remove("verberg");
     knopVerwachting.classList.add('verberg');
     knopBilt.textContent = "Toon het weer in De Bilt";


   }
 }

  // Vaststellen van de locatie van de gebruiker
  // via https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
  navigator.geolocation.getCurrentPosition(function(position) {

    console.log('Ik wordt aangeroepen');
    lat = position.coords.latitude.toFixed(3); // Latitude Coordinaten afronden tot 3 cijfers achter komma
    long = position.coords.longitude.toFixed(3); // Longitude Coordinaten afronden tot 3 cijfers achter komma

    console.log(lat);
    console.log(long);

      // API URL van OpenWeatherMap.org voor huidige locatie
      // Verbinding met API, via: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON
      let apiGeoURL = 'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&units=metric&lang=nl&appid=8a2ec9288a2410007fc828bb57ee62b6';
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

      myH2[0].textContent = data.name; //Naam van vastgestelde Plaats

      const weerGPS = jsonObj['weather'];

      for (let i = 0; i < weerGPS.length; i++) { // For loop voor alle weer data

        weerWolk[0].src = 'https://openweathermap.org/img/wn/'+weerGPS[i].icon+'@2x.png'; //Weer icon via OpenWeatherMap.org
        huidigOms.textContent = weerGPS[i].description; //Omschrijving van weer
      }

      huidigTemp.textContent = data.main.temp.toFixed(1)+' °C'; //Temperatuur afronden tot 1 cijfer achter komma
      knopVerwachting.classList.remove('verberg'); //Knop 'weersverwachting' komt tevoorschijn
    }
});
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
    const imgIcon = document.createElement('img');
    const imgWeer = document.createElement('img');
    const h3 = document.createElement('h3');
    const pWeerInfo = document.createElement('p');
    const pWeerTemp = document.createElement('p');

    li.classList.add('list-element'); // List item krijgt class 'list-element'

    imgIcon.classList.add('reorder-icon', 'verberg'); // Afbeelding van het weer icon (wolkje)
    imgIcon.src = 'img/reorder-24px.svg';
    imgIcon.alt = 'sleep om volgorde te veranderen';

    imgWeer.draggable = false;
    imgWeer.src = 'https://openweathermap.org/img/wn/'+weerSteden[i].weather[0].icon+'.png';
    imgWeer.alt = weerSteden[i].weather[0].description+' icoon afbeelding';

    h3.textContent = weerSteden[i].name;

    pWeerInfo.textContent = weerSteden[i].weather[0].description;

    pWeerTemp.classList.add('temperatuur');
    pWeerTemp.textContent = weerSteden[i].main.temp.toFixed()+' °C';

    li.appendChild(imgIcon); //Element wordt binnen List Item geplaatst
    li.appendChild(imgWeer);
    li.appendChild(h3);
    li.appendChild(pWeerInfo);
    li.appendChild(pWeerTemp);
    deLijst.appendChild(li); // List item wordt binnen de UL-list geplaatst
  }
}

///////////////////////////////////////////////////
/////////////// SORTABLE JS LIBRARY ///////////////
/// via: https://github.com/SortableJS/Sortable ///
///////////////////////////////////////////////////

  var sortable = Sortable.create(deLijst, { //Laat Sortable een sleepbare lijst maken van 'deLijst'
  animation: 300,  // Animatie snelheid in ms
  easing: "cubic-bezier(1, 0, 0, 1)",
  //disabled: true, //De 'drag and drop' functie is allereest uitgeschakeld
  });
///////////////////////////////////////////////////
