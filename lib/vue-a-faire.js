module.exports = function(modele) {
 document.getElementById('liste').innerHTML = creerHtml(modele)
}

function creerHtml(modele) {
 var html = ''
 modele.data.forEach(function(element) {
  html = html + creerHtmlElement(element)
 })
 return html
}

function creerHtmlElement(element) {
 if(element.fait) {
  var classeFaitOuNon = 'fait'
  var iconeBasculerFait = 'remove'
 } else {
  var classeFaitOuNon = 'a-faire'
  var iconeBasculerFait = 'ok'
 }
 var htmlEl = '<div class="liste-element ' + classeFaitOuNon + '">'
  + '<div class="liste-element-info">'
   + '<div class="liste-element-texte">'
    + '<p>' + element.text + '</p>'
   + '</div>'
   + '<div class="liste-element-modif">'
    + '<span class="glyphicon glyphicon-pencil"></span>'
   + '</div>'
   + '<div class="liste-element-statut">'
    + '<span class="glyphicon glyphicon-' + iconeBasculerFait + '"></span>'
   + '</div>'
  + '</div>'

 if(element.maj) {
  htmlEl = htmlEl + '<div class="liste-element-maj">'
   + '<div class="liste-element-maj-input">'
    + '<input class="form-control" id="liste-element-maj-input" type="text">'
   + '</div>'
   + '<div class="liste-element-maj-bouton">'
    + '<button class="btn btn-primary" id="liste-element-maj-bouton">OK</button>'
   + '</div>'
  + '</div>'
 }

 return htmlEl + '</div>'
}
