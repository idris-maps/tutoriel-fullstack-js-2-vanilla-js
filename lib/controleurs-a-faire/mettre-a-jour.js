var rafraichir = require('./rafraichir')

module.exports = function(modele) {
 var maj = false
 var index = null 
 modele.data.forEach(function(element, indexElement) {
  if(element.maj) { 
   maj = true 
   index = indexElement
  }
 })

 if(maj) {
  var input = document.getElementById('liste-element-maj-input')
  var btn = document.getElementById('liste-element-maj-bouton')
  btn.onclick = function() {
   if(input.value) {
    modele.mettreAJour(index, input.value)
    modele.data[index].maj = undefined
    input.value = ''
    rafraichir(modele)
   }
  }
 }
}

