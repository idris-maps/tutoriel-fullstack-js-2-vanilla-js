var rafraichir = require('./rafraichir')

module.exports = function(modele) {
 var btns = document.getElementsByClassName('liste-element-modif')
 for(i=0;i<btns.length;i++) {
  var index = i
  var btn = btns[i]
  ajouterEvenement(modele, btn, index)
 }
}

function ajouterEvenement(modele, btn, index) {
 btn.addEventListener('click', function() {
  if(modele.data[index].maj) { 
   modele.data[index].maj = undefined
   rafraichir(modele)
  } else {
   modele.data.forEach(function(element) { if(element.maj) { element.maj = undefined } })
   modele.data[index].maj = true
   rafraichir(modele)
  }
 })
}
