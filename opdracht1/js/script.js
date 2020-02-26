

///////////////////////////////////////////////////
/////////////// SORTABLE JS LIBRARY ///////////////
/// via: https://github.com/SortableJS/Sortable ///
///////////////////////////////////////////////////

  var deLijst = document.querySelector('#dragable-list'); //De lijst (playlist)

  var sortable = Sortable.create(deLijst, { //Laat Sortable een sleepbare lijst maken van 'deLijst'
    animation: 250,  // Animatie snelheid in ms
  	easing: "cubic-bezier(1, 0, 0, 1)",
    disabled: true, //De 'drag and drop' functie is allereest uitgeschakeld
  });

///////////////////////////////////////////////////

document.querySelector('.wijzig').addEventListener("click", function() {//Kijk naar clicks bij button
  // console.log(this);
  var icoon = document.querySelectorAll('.reorder-icon'); //Selecteer alle 'sorteer' icons

  // Sortable: check of de sleepbare lijst is disabled (true of false).
  // Bron via: https://github.com/SortableJS/Sortable#disabled-options
      var state = sortable.option("disabled");

  var lijstItem = document.querySelectorAll('.list-element'); //Selecteer de list items

  if (this.firstChild.data == "Wijzig") //Wanneer de tekst in de knop 'Wijzig' is, doe onderstaande
   {
      // console.log('Wijzig wordt gereed');
      this.firstChild.data = "Gereed"; //Tekst in de knop wordt nu 'Gereed'

      // Sortable: verander de waarde van 'disabled' naar iets anders dan huidige state.
      // Bron via: https://github.com/SortableJS/Sortable#disabled-options
          sortable.option("disabled", !state);

      lijstItem.forEach(function(item){ //Voor elk list item wordt de cursor gewijzigd naar 'move'
        item.style.cursor = "move";
      });

      icoon.forEach(function(item){ //Voor alle 'sorteer' icons, verwijder class '.hidden'
        item.classList.remove("hidden");
      });
   }
   else //In alle andere gevallen, doe onderstaande
   {
     // console.log('Gereed wordt Wijzig');
     this.firstChild.data = "Wijzig"; //Tekst in de knop wordt nu 'Wijzig'

     // Sortable: verander de waarde van 'disabled' naar iets anders dan huidige state.
     // Bron via: https://github.com/SortableJS/Sortable#disabled-options
          sortable.option("disabled", !state);

     lijstItem.forEach(function(item){ //Voor elk list item wordt de cursor gewijzigd naar 'default'
       item.style.cursor = "default";
     });

     icoon.forEach(function(item){ //Voor alle 'sorteer' icons, voeg class '.hidden' toe
       item.classList.add("hidden");
     });
   }
});
