/*jshint esversion: 6 */
/*jshint sub:true*/

//Header en section selecteren en opslaan in variabelen
const header = document.querySelector('header');
const section = document.querySelector('section');

//JSON URL opslaan in variabele requestURL
let requestURL = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json';

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
  const superHeroes = request.response; //Response van server opslaan in variabele superHeroes
  populateHeader(superHeroes); //Functie populateHeader
  showHeroes(superHeroes); //Functie showHeroes
};


function populateHeader(jsonObj) {
  const myH1 = document.createElement('h1'); //We maken een H1 element aan in het document
  myH1.textContent = jsonObj['squadName']; //We zetten de text inhoud van het gemaakte H1 element gelijk aan het JSON object squadName
  header.appendChild(myH1); //Voeg de H1 toe aan de header

  const myPara = document.createElement('p'); //We maken een p element aan

  //Hieronder wordt de tekstcontent van het p element de waarde van JSON objecten 'homeTown' en 'formed'
  myPara.textContent = 'Hometown: ' + jsonObj['homeTown'] + ' // Formed: ' + jsonObj['formed'];
  header.appendChild(myPara); //Voeg de p toe aan de header
}

function showHeroes(jsonObj) {
  const heroes = jsonObj['members']; //Variabele heroes krijgt de waarde van JSON object 'members'

  //Een for-loop om alle members uit de JSON-file in de HTML te plaatsen
  for (let i = 0; i < heroes.length; i++) {
    const myArticle = document.createElement('article'); //Variabele myArticle krijgt als inhoud het aanmaken van een html element
    const myH2 = document.createElement('h2');  //Variabele myH2 krijgt als inhoud het aanmaken van een html element
    const myPara1 = document.createElement('p'); //etc
    const myPara2 = document.createElement('p');
    const myPara3 = document.createElement('p');
    const myList = document.createElement('ul');

    myH2.textContent = heroes[i].name; //Tekst inhoud van h2 wordt element van JSON object 'heroes' en daarvan het onderdeel 'name'
    myPara1.textContent = 'Secret identity: ' + heroes[i].secretIdentity; //Tekst inhoud wordt nu gevuld met onderdeel secretIdentity uit JSON object
    myPara2.textContent = 'Age: ' + heroes[i].age; //Tekst inhoud wordt nu gevuld met onderdeel age uit JSON object
    myPara3.textContent = 'Superpowers:';

    const superPowers = heroes[i].powers;  //Variabele superPowers heeft als waarde het onderdeel 'powers' uit het JSON object

    //Een for-loop voor de lengte van superPowers
    for (let j = 0; j < superPowers.length; j++) {
      const listItem = document.createElement('li'); //Maak element LI aan
      listItem.textContent = superPowers[j]; //Tekst content van een list item wordt gevuld met de waarde van één uit de superPowers
      myList.appendChild(listItem); //Voeg het list-item toe aan het einde van myList
    }

    myArticle.appendChild(myH2); //Etc
    myArticle.appendChild(myPara1);
    myArticle.appendChild(myPara2);
    myArticle.appendChild(myPara3);
    myArticle.appendChild(myList);

    section.appendChild(myArticle);
  }
}
