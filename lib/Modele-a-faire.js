module.exports = function() {
 var ctx = this
 ctx.data = [
  {text: 'Manger', fait: true},
  {text: 'Dormir', fait: false}
 ]
 ctx.ajouter = function(text) {
  ctx.data.push({text: text, fait: false})
 }
 ctx.basculerFait = function(index) {
  if(ctx.data[index].fait) { ctx.data[index].fait = false }
  else { ctx.data[index].fait = true }
 }
 ctx.mettreAJour = function(index, text) {
  ctx.data[index].text = text
 }
 ctx.supprimerFait = function() {
  var aGarder = []
  ctx.data.forEach(function(element) {
   if(!element.fait) { aGarder.push(element) }
  })
  ctx.data = aGarder
 }
}
