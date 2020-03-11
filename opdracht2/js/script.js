
// Globale variabelen
var sliderFont = document.querySelector('input[name="tekstslider"]'); //Slider voor tekstgrootte
var sliderGrid = document.querySelector('input[name="gridslider"]'); //Slider voor grid Kolommen
var contrast = document.querySelector('button[name="contrast"]'); //Knop voor Contrast thema
var normaal = document.querySelector('button[name="normaal"]'); //Knop voor licht (normaal) thema
var automatisch = document.querySelector('button[name="automatisch"]'); //Knop voor automatisch aantal grid Kolommen
var root = document.documentElement; //Root van het document (belangrijk voor CSS root)
var instellingen = document.querySelector('.instelknop'); //Knop voor Instellingspaneel
var paneel = document.querySelector('.panel'); //Het Instellingspaneel

//Event Listeners
sliderFont.addEventListener('input', tekstGrootte);
sliderGrid.addEventListener('input', aantalKolommen);
contrast.addEventListener("click", geefContrast);
normaal.addEventListener("click", doeMaarNormaal);
instellingen.addEventListener("click", tonenVerbergen);
automatisch.addEventListener("click", gridAuto);

//Event listeners toetsenbord
window.onkeydown = function(e){
    var toets = e.keyCode;
    if(toets===67){ //C-toets
      geefContrast();
    }

    else if(toets===76){ //L-toets
      doeMaarNormaal();
    }

    else if(toets===65){ //L-toets
      gridAuto();
    }

    else if(toets===187){//Plus-toets
      sliderFont.value = +sliderFont.value+10; //Laat waarde van sliderFont toenemen met 10
      tekstGrootte();
    }

    else if(toets===189){//Min-toets
      sliderFont.value = +sliderFont.value-10; //Laat waarde van sliderFont afnemen met 10
      tekstGrootte();
    }

    else if(toets===49) { //1-toets
      sliderGrid.value = 1;
      aantalKolommen();
    }

    else if(toets===50) {//2-toets
      sliderGrid.value = 2;
      aantalKolommen();
    }

    else if(toets===51) {//3-toets
      sliderGrid.value = 3;
      aantalKolommen();
    }

    else if(toets===52) {//4-toets
      sliderGrid.value = 4;
      aantalKolommen();
    }

    else if(toets===53) {//5-toets
      sliderGrid.value = 5;
      aantalKolommen();
    }

    else if(toets===54) {//6-toets
      sliderGrid.value = 6;
      aantalKolommen();
    }

    else if(toets===55) {//7-toets
      sliderGrid.value = 7;
      aantalKolommen();
    }

    else if(toets===56) {//8-toets
      sliderGrid.value = 8;
      aantalKolommen();
    }

    else if(toets===57) {//9-toets
      sliderGrid.value = 9;
      aantalKolommen();
    }
};

//Groote van tekst wordt aangepast op basis van de waarde van de slider
function tekstGrootte() {
  document.body.style.fontSize = sliderFont.value+'%'; //Toevoeging van percentage
}

//Automatische grid kolommen
function gridAuto() {
  root.style.setProperty('--grid-kolom', "auto-fill"); //Root CSS grid-kolom instellen op auto-fill
  root.style.setProperty('--grid-breedte', "minmax(250px, 1fr)"); //Root CSS grid-breedte instellen op minmax
  automatisch.classList.add("active"); //Voeg class 'active' toe aan knop
}

//Handmatig grid kolommen instellen
function aantalKolommen() {
  sliderGrid.value = +sliderGrid.value; //Waarde van slider wordt nummer
  root.style.setProperty('--grid-kolom', sliderGrid.value);  //Root CSS grid-kolom instellen op waarde van slider
  root.style.setProperty('--grid-breedte', "1fr");  //Root CSS grid-breedte instellen op 1fr
  automatisch.classList.remove("active"); //Verwijder class 'active' van knop 'Automatisch'
}

//Wijzig kleuren website voor meer contrast
function geefContrast() {
  root.style.setProperty('--achtergrond-kleur', "black"); //Root CSS actergrond-kleur instellen op black
  root.style.setProperty('--tekst-kleur', "white"); //Root CSS tekst-kleur instellen op white
  root.style.setProperty('--actie-kleur', "yellow"); //Root CSS actie-kleur instellen op yellow
  root.style.setProperty('--sub-kleur', "rgb(32,33,36)"); //Root CSS sub-kleur instellen op rgb(32,33,36)

  normaal.classList.remove("active"); //Verwijder class 'active' van knop 'Licht'
  contrast.classList.add("active"); //Voeg class 'active' toe aan knop 'Contrast'
}

//Wijzig kleuren website voor normaal thema
function doeMaarNormaal() {
  root.style.setProperty('--achtergrond-kleur', "white"); //Root CSS actergrond-kleur instellen op white
  root.style.setProperty('--tekst-kleur', "black"); //Root CSS tekst-kleur instellen op black
  root.style.setProperty('--actie-kleur', "blue"); //Root CSS actie-kleur instellen op blue
  root.style.setProperty('--sub-kleur', "white"); //Root CSS sub-kleur instellen op white

  contrast.classList.remove("active"); //Verwijder class 'active' van knop 'Contrast'
  normaal.classList.add("active"); //Voeg class 'active' toe aan knop 'Licht'
}

//Openen en sluiten van Instellingspaneel
function tonenVerbergen(){
  var tandwiel = document.getElementById('tandwiel'); //Tandwiel icon

  paneel.classList.toggle("weg"); //Toggle class 'weg' voor tonen en verberegen van paneel
  if(tandwiel.innerHTML === "settings"){
     tandwiel.innerHTML="close";  //Verander tandwiel-icon naar sluit icon
   }
  else {
   tandwiel.innerHTML ="settings";
  }
}
