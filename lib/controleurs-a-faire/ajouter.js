var rafraichir = require('./rafraichir')

module.exports = function(modele) {
 var input = document.getElementById('ajouter-input')
 var btn = document.getElementById('ajouter-bouton')
 btn.onclick = function() {
  if(input.value) {
   modele.ajouter(input.value)
   input.value = ''
   rafraichir(modele)
  }
 }
}
