var rafraichir = require('./rafraichir')

module.exports = function(modele) {
 var btns = document.getElementsByClassName('liste-element-statut')
 for(i=0;i<btns.length;i++) {
  var index = i
  var btn = btns[i]
  ajouterEvenement(modele, btn, index)
 }
}

function ajouterEvenement(modele, btn, index) {
 btn.addEventListener('click', function() {
  modele.basculerFait(index)
  rafraichir(modele)
 })
}
