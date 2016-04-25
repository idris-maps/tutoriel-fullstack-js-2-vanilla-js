var rafraichir = require('./rafraichir')

module.exports = function(modele) {
 var btn = document.getElementById('supprimer-fait-bouton')
 btn.onclick = function() {
  modele.supprimerFait()	
  rafraichir(modele)
 }
}
