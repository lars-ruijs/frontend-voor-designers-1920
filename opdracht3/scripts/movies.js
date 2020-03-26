/*jshint esversion: 6 */
/*jshint sub:true*/

//Header en section selecteren en opslaan in variabelen
const header = document.querySelector('header');
const section = document.querySelector('section');

const plaats = 'Alkmaar';

//JSON URL opslaan in variabele requestURL
let requestURL = 'https://api.openweathermap.org/data/2.5/weather?q=Alkmaar&units=metric&lang=nl&appid=8a2ec9288a2410007fc828bb57ee62b6';

//Om een nieuwe request aan te maken, moeten we een nieuw object van XMLHttpRequest aanmaken (nu met variabele request)
let request = new XMLHttpRequest();

//We openen nu het request via de 'open()' methode
request.open('GET', requestURL);

//We geven hier aan dat het responseType een JSON bestand is
request.responseType = 'json';
//We versturen nu het request
request.send();

//Nu wachten op het response van de server
request.onload = function() {
  const alleFilms = request.response; //Response van server opslaan in variabele alleFilms

  console.log(alleFilms);
  // populateHeader(alleFilms); //Functie populateHeader
  toonFilms(alleFilms); //Functie showHeroes
};

//
// function populateHeader(jsonObj) {
//   const myH1 = document.createElement('h1'); //We maken een H1 element aan in het document
//   myH1.textContent = jsonObj['squadName']; //We zetten de text inhoud van het gemaakte H1 element gelijk aan het JSON object squadName
//   header.appendChild(myH1); //Voeg de H1 toe aan de header
//
//   const myPara = document.createElement('p'); //We maken een p element aan
//
//   //Hieronder wordt de tekstcontent van het p element de waarde van JSON objecten 'homeTown' en 'formed'
//   myPara.textContent = 'Hometown: ' + jsonObj['homeTown'] + ' // Formed: ' + jsonObj['formed'];
//   header.appendChild(myPara); //Voeg de p toe aan de header
// }

function toonFilms(jsonObj) {
  const films = jsonObj;
  // const films = jsonObj['members']; //Variabele heroes krijgt de waarde van JSON object 'members'

  //Een for-loop om alle members uit de JSON-file in de HTML te plaatsen
    const myArticle = document.createElement('article'); //Variabele myArticle krijgt als inhoud het aanmaken van een html element
    const myH2 = document.createElement('h2');  //Variabele myH2 krijgt als inhoud het aanmaken van een html element
    const p1 = document.createElement('p');
    const p2 = document.createElement('p');
    // const myPara1 = document.createElement('p'); //etc
    // const myPara2 = document.createElement('p');
    // const myPara3 = document.createElement('p');
    // const myList = document.createElement('ul');

    myH2.textContent = films.name; //Tekst inhoud van h2 wordt element van JSON object 'heroes' en daarvan het onderdeel 'name'
    p1.textContent = films.visibility;
    // myPara1.textContent = 'Secret identity: ' + heroes[i].secretIdentity; //Tekst inhoud wordt nu gevuld met onderdeel secretIdentity uit JSON object
    // myPara2.textContent = 'Age: ' + heroes[i].age; //Tekst inhoud wordt nu gevuld met onderdeel age uit JSON object
    // myPara3.textContent = 'Superpowers:';

    // const superPowers = heroes[i].powers;  //Variabele superPowers heeft als waarde het onderdeel 'powers' uit het JSON object

    // //Een for-loop voor de lengte van superPowers
    // for (let j = 0; j < superPowers.length; j++) {
    //   const listItem = document.createElement('li'); //Maak element LI aan
    //   listItem.textContent = superPowers[j]; //Tekst content van een list item wordt gevuld met de waarde van één uit de superPowers
    //   myList.appendChild(listItem); //Voeg het list-item toe aan het einde van myList
    // }

    myArticle.appendChild(myH2);
    myArticle.appendChild(p1); //Etc
    // myArticle.appendChild(myPara1);
    // myArticle.appendChild(myPara2);
    // myArticle.appendChild(myPara3);
    // myArticle.appendChild(myList);

    section.appendChild(myArticle);

    const weather = jsonObj['weather'];

    for (let i = 0; i < weather.length; i++) {

      const img = document.createElement('img');
      const p2 = document.createElement('p');

      img.src = 'https://openweathermap.org/img/wn/'+weather[i].icon+'@2x.png';
      p2.textContent = weather[i].description;

      myArticle.appendChild(img);
      myArticle.appendChild(p2);
    }

    const mainInfo = jsonObj['main'];


      const p3 = document.createElement('p');
      const p4 = document.createElement('p');
      const p5 = document.createElement('p');

      p3.textContent = 'Temperatuur: '+mainInfo.temp.toFixed(1)+' °C';
      p4.textContent = 'Voelt als: '+mainInfo.feels_like.toFixed(1)+' °C';
      p5.textContent = 'Vochtigheid: '+Math.round(mainInfo.humidity)+' %';

      myArticle.appendChild(p3);
      myArticle.appendChild(p4);
      myArticle.appendChild(p5);
}
