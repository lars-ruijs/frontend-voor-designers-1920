/*
  Wat doe je ook alweer in Javascript voor een micro-interactie?
  1. Gebruik de querySelector om een element in je html te selecteren
  2. Koppel een evenListener aan het element om een mouse-event te detecteren
  3. Gebruik het Classlist object om een css class aan een element toe te voegen of weg te halen.
*/

//Element dat gesleept wordt
function dragStart(element) {
  this.style.opacity = '0.4'; //Voeg doorzichtigheid toe
  dragSrcEl = this; //Variabele dragSrcEl bevat het html LI-item
  element.dataTransfer.effectAllowed = 'move'; //Slepen
  element.dataTransfer.setData('text/html', this.innerHTML);
}

//Voeg een class 'over' toe wanneer je  met iets sleepbaars over een element gaat
function dragEnter(element) {
  this.classList.add('over');
}

//Slepen eindigt
function dragEnd(element) {
  var listItems = document.querySelectorAll('.sleepbaar');
  [].forEach.call(listItems, function(item) {
    item.classList.remove('over');
  });
  this.style.opacity = '1';
}

function dragOver(element) {
  element.preventDefault();
  element.dataTransfer.dropEffect = 'move';
  return false;
}

function dragLeave(element) {
  element.stopPropagation();
  this.classList.remove('over');
}

function dragDrop(e) {
  if (dragSrcEl != this) {
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/html');
  }
  return false;
}

var listItems = document.querySelectorAll('.sleepbaar');
[].forEach.call(listItems, function(item) {
  addEventsDragAndDrop(item);
});

function addEventsDragAndDrop(el) {
  el.addEventListener('dragstart', dragStart, false);
  el.addEventListener('dragenter', dragEnter, false);
  el.addEventListener('dragover', dragOver, false);
  el.addEventListener('dragleave', dragLeave, false);
  el.addEventListener('drop', dragDrop, false);
  el.addEventListener('dragend', dragEnd, false);
}

document.querySelector("button").addEventListener("click", function(){
  icon = document.querySelectorAll(".icon");
  icon.classList.toggle("test");
});

// document.addEventListener("dragstart", function(element) {
//   // store a ref. on the dragged elem
//   dragged = element.target;
//   // make it half transparent
//   element.target.style.opacity = '0.4';
//   event.dataTransfer.effectAllowed = "move";
// }, false);
//
// document.addEventListener("dragend", function(event) {
//   // reset the transparency
//   event.target.style.opacity = "";
// }, false);
//
// document.addEventListener("dragover", function(event) {
//   // prevent default to allow drop
//   event.preventDefault();
// }, false);
//
// document.addEventListener("dragenter", function(event) {
//   // highlight potential drop target when the draggable element enters it
//   if (event.target.className == "dropzone") {
//     event.target.style.background = "purple";
//   }
//
// }, false);
//
// document.addEventListener("dragleave", function(event) {
//   // reset background of potential drop target when the draggable element leaves it
//   if (event.target.className == "dropzone") {
//     event.target.style.background = "";
//   }
//
// }, false);
//
// document.addEventListener("drop", function(event) {
//   // prevent default action (open as link for some elements)
//   event.preventDefault();
//   // move dragged elem to the selected drop target
//   if (event.target.className == "dropzone") {
//     event.target.style.background = "";
//     dragged.parentNode.removeChild( dragged );
//     event.target.appendChild( dragged );
//   }
// }, false);
