# "Vanilla" JS

Le javascript "vanilla" est une manière de désigner le javascript "pure", c'est à dire sans utiliser de scripts externes. On écrit tout le code soi-même sans avoir recours à des librairies ou "framework" pour se faciliter la tâche. L'avantage principal, et c'est la raison pour laquelle nous commençons avec ça, est que vous savez exactement ce qui se passe. Il n'y a pas de magie. Par contre il faut écrire un peu plus de code...

## Mise en place

Créez un nouveau dossier (je l'appelle ```2.vanilla```) pour le projet et à l'intérieur de celui-ci un dossier ```public``` ou nous mettons les fichiers ```style.css``` et ```index.html``` créés dans le chapitre précèdant.

Ouvrez ```index.html```, supprimez le contenu de la balise ```<div id="liste">```, ajoutez une balise```<script src="script.js"></script>``` avant la fin du corp du document et changez le titre de la balise ```<title>```.

```
<!doctype html>
<html>
 <head>
 <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>Vanilla</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
  <link rel="stylesheet" href="style.css">
 </head>
 <body>
<div id="contenu">
 <h1>À faire</h1>
 <div id="liste"></div>
 <div id="formulaire">
  <div class="ajouter">
   <div class="ajouter-input">
    <input id="ajouter-input" class="form-control" placeholder="À faire" type="text">
   </div>
   <div class="ajouter-bouton">
    <button id="ajouter-bouton" class="btn btn-primary">Ajouter</button>
   </div>
  </div>
  <div id="supprimer-fait">
   <button id="supprimer-fait-bouton" class="btn btn-danger">Supprimer ce qui a été fait</button>
  </div>
 </div>
</div>
<script src="script.js"></script>
 </body>
</html>
```

Dans un terminal, naviguez jusqu'au dossier de votre projet et initialisez NPM

```
$ cd ~/Desktop/2.vanilla
$ npm init
```

Un fichier ```package.json``` sera créé. Ouvrez le et ajoutez un script ```build``` pour créer ```public/script.js``` et le minifier. Pour cette opération ```browserify``` et ```minify``` doivent avoir été installés globalement. Voir l'[introduction](link_to_do) de ce cette série.

```
{
 "name": "2.vanilla",
 "version": "1.0.0",
 "description": "",
 "main": "index.js",
 "scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "build": "browserify main.js -o public/script.js | minify public/script.js -o public/script.js"
 },
 "author": "",
 "license": "ISC"
}
```

```browserify``` crée le fichier ```public/script.js``` contenant ```main.js``` et toutes ses dépendences. ```minify``` comme son nom l'indique le minifie. ```public/script.js``` est maintenant presque illisible mais se chargera plus rapidement.

Créez un fichier ```main.js``` et un dossier ```lib``` à la racine de votre projet. Votre dossier doit maintenant avoir cette structure:

```
vanilla
 -lib
 -public
  index.html
  style.css
 main.js
 package.json
```

## Le modèle

Dans le dossier ```lib```, créez un fichier ```Modele-a-faire.js```.

Il est commun de nommer les fonctions "constructeurs" (plus d'infos [ici](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function)) avec une majuscule.

Ouvrez le fichier, créez un module et liez le contexte ```this``` à une variable ```ctx```. Comme le contexte peut changer à l'intérieur d'une autre fonction, il vaut mieux le lier à une variable plutôt qu'utiliser ```this``` qui peut soudain se réferer à un autre contexte.

```
module.exports = function() {
 var ctx = this
}
```

Les choses à faire seront contenues dans un dictionnaire ```data```. Nous en ajoutons déjà deux: "manger" et "dormir". On va dire que "manger" c'est fait et que "dormir" reste à faire.

```
module.exports = function() {
 var ctx = this
 ctx.data = [
  {text: "Manger", fait: true},
  {text: "Dormir", fait: false}
 ]
}
```

Nous allons maintenant ajouter quelques méthodes pour modifier le dictionnaire.

### Ajouter quelque chose à faire

```
ctx.ajouter = function(text) {
 ctx.data.push({text: text, fait: false})
}
```

La fonction ```.ajouter()``` prends une valeur ```text``` et ajoute un objet au dictionnaire. Par défaut, on va dire que ce n'est pas encore fait. Sinon il n'y a aucune raison de l'ajouter.

### Basculer fait

La clé ```fait``` des objets du dictionnaire est un booléen qui est soit ```true``` (vrai), soit ```false``` (faux). Nous allons créer une fonction qui prends l'```index``` de l'object dans le dictionnaire et qui changera la clé ```fait``` de l'objet en question.

```
ctx.basculerFait = function(index) {
 if(ctx.data[index].fait) { ctx.data[index].fait = false }
 else { ctx.data[index].fait = true }
}
```

### Mettre à jour

Nous voulons pouvoir changer le contenu du texte d'un objet. Pour cela nous créons une fonction qui prends l'```index``` et le nouveau ```text```.

```
ctx.mettreAJour = function(index, text) {
 ctx.data[index].text = text
}
```

### Supprimer fait

Nous voulons également pouvoir supprimer tous les objets marqués comme fait.

```
ctx.supprimerFait = function() {
 var aGarder = []
 ctx.data.forEach(function(element) {
  if(!element.fait) { aGarder.push(element) }
 })
 ctx.data = aGarder
}
```

Ici nous créons un nouveau dictionnaire ```aGarder``` et y ajoutons les objets dont la clé ```fait``` est ```false```. Finalement nous remplaçons l'ancien dictionnaire ```ctx.data``` par ```aGarder```.

### Tout ensemble

Nous avons maintenant un modèle avec les méthodes dont nous avons besoin pour le modifier. 

Le fichier ```Modele-a-faire.js``` resemble à ça:

```
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
```

## La vue

Cette partie est la plus difficile à faire proprement sans utiliser une librairie "patron" ("template" en anglais). La technique que nous allons utiliser ici consiste à créer une chaîne de caractères HTML et à l'intégrer dans la balise ```<div id="liste">``` en remplaçant son contenu. Il n'est généralement pas recommandé de mélanger HTML et javascript de cette manière. Dans le prochain chapitre nous utiliserons une librairie "patron". Le but ici est de comprendre comment ça fonctionne et de ne pas utiliser de scriptes externes.

Dans le dossier ```lib```, créez un fichier ```vue-a-faire.js``` et ouvrez-le.

### Créer un élément de la liste

Nous allons en premier créer une fonction qui renvoit un élément de la liste. Comme nous avons vu précedemment celui-ci est différent selon qu'il soit ```fait``` ou non et selon qu'il soit en cours de modification ou pas.  

```
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
```

Nous créons deux variables qui seront différentes si la chose a été faite ou pas:

* ```classeFaitOuNon```: la classe CSS qui définit le fond de couleur de la ```<div>```
* ```iconeBasculerFait```: l'icône Bootstrap du bouton

Puis nous créons la chaîne de caractères HTML en incluant la clé ```text``` de l'élément. C'est la partie ```element.text```.

Si l'élément est en cours de mise à jour, nous ajoutons une ```<div class="liste-element-maj">```.

Finalement la fonction retourne la chaîne de caractères HTML ainsi créée.

### Créer la liste

Notre prochaine fonction crée une chaîne de caractères vide, puis y ajoute le HTML de chaque élément du dictionnaire ```modele.data``` en invoquant la fonction ```creerHtmlElement()```. Finalement elle retourne le HTML complet de la liste.

```
function creerHtml(modele) {
 var html = ''
 modele.data.forEach(function(element) {
  html = html + creerHtmlElement(element)
 })
 return html
}
```

### Créer le module

Pour finir nous créons un module exportable qui prends le ```modele``` comme argument, invoque ```creerHtml()``` pour avoir le contenu de la liste et l'ajoute à la balise ```<div id="liste">```.

Le fichier ```vue-a-faire.js``` en entier:

```
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
```

## Les controleurs

Nous avons un modèle et une vue, il faut maintenant faire les controleurs qui permettent de modifier le modèle en interagissant avec la vue.

Notre page a deux parties:

* La liste (qui sera réactualisée à chaque modification)
* Le formulaire (qui ne changera pas)

Quand la liste est réactualisée, il nous faudra ajouter à nouveau tous les controleurs. En revanche, pour la partie "formulaire", nous n'avons besoin d'ajouter des controleurs qu'une fois, quand la page est chargée. Il nous faut donc deux fonctions "controleurs" que nous appelerons ```.creer()``` et ```.rafraichir()```. Comme les deux fonctions ont pour but d'interagir avec le modèle, elle prendront les deux un argument ```modele```.

Dans ```lib```, créez un fichier ```controleurs-a-faire.js``` exportant ces deux fonctions.

```
exports.creer = function(modele) {

} 

exports.rafraichir = function(modele) {

}
``` 

Commençons par les controleurs qui seront activés uniquement lors du chargement de la page:

* Ajouter quelque chose à faire
* Supprimer ce qui a été fait

```
exports.creer = function(modele) {
 ajouter(modele)
 supprimerFait(modele)
} 
```

Par souci de clarté nous allons créer un nouveau fichier pour chaque contrôleur. Dans le dossier ```lib```, créez un nouveau dossier ```controleurs-a-faire``` avec deux fichiers:

* ```ajouter.js```
* ```supprimer-fait.js```

Dans ```controleurs-a-faire.js```, nous ajoutons un lien vers ces deux fichiers en haut de la page.

```
var ajouter = require('./controleurs-a-faire/ajouter')
var supprimerFait = require('./controleurs-a-faire/supprimer-fait')

exports.creer = function(modele) {
 ajouter(modele)
 supprimerFait(modele)
} 

exports.rafraichir = function(modele) {

}
```

### ```ajouter.js```

```
module.exports = function(modele) {
 var input = document.getElementById('ajouter-input')
 var btn = document.getElementById('ajouter-bouton')
 btn.onclick = function() {
  if(input.value) {
   modele.ajouter(input.value)
   input.value = ''
  }
 }
}
```

Ce controleur utilise deux éléments de la page: la balise ```<input id="ajouter-input">``` et le bouton ```<button id="ajouter-bouton">```, nous les référençons par deux variables ```input``` et ```btn```. Quand ```btn``` est clické, si ```input``` n'est pas vide, nous invoquons la méthode ```.ajouter()``` du modèle. Puis ```input``` est remis à zéro.

Nous avons modifié le modèle mais la liste n'est pas actualisée. Comme nous allons devoir réactualiser la liste à chaque modification, nous avons besoin d'une fonction qui s'en chargera.

### ```rafraichir.js```

Dans ```lib/controleurs-a-faire```, créez un fichier ```rafraichir.js```:

```
var vue = require('../vue-a-faire')
var controleurs = require('../controleurs-a-faire')

module.exports = function(modele) {
 vue(modele)
 controleurs.rafraichir(modele)
}
```

Cette fonction invoquera la vue et rafraîchira les controleurs qui auront besoin de l'être (la fonction ```.rafraichir()``` de ```controleurs-a-faire.js``` qui est encore vide).

Retournez à ```ajouter.js``` et appelez la fonction ```.rafraichir()``` une fois le modèle modifié.

```
var rafraichir = require('./rafraichir') // <-- nouveau

module.exports = function(modele) {
 var input = document.getElementById('ajouter-input')
 var btn = document.getElementById('ajouter-bouton')
 btn.onclick = function() {
  if(input.value) {
   modele.ajouter(input.value)
   input.value = ''
   rafraichir(modele) // <-- nouveau
  }
 }
}
```

### ```supprimer-fait.js```

Ouvrez le fichier ```supprimer-fait.js``` dans le dossier ```lib/controleurs-a-faire```.

```
var rafraichir = require('./rafraichir')

module.exports = function(modele) {
 var btn = document.getElementById('supprimer-fait-bouton')
 btn.onclick = function() {
  modele.supprimerFait()	
  rafraichir(modele)
 }
}
```

Cette fonction lie la balise ```<button id="supprimer-fait-bouton">``` à une variable ```btn```. Quand ```btn``` est clické, la méthode ```.supprimerFait()``` du modèle est invoquée puis la vue est rafraîchie.

Passons maintenant aux controleurs de la liste. Ceux qui vont devoir être rafraîchis à chaque fois que la vue est mise à jour. 

### ```basculer-fait.js```

Créez un fichier ```basculer-fait.js``` dans ```lib/controleurs-a-faire```

```
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
```

Cette fonction référence toutes les balises ```<div class="liste-element-statut">``` dans une variable ```btns``` et pour chacune d'entre elles y ajoute un événement ```click``` qui invoque la méthode ```.basculerFait()``` du modèle puis rafraîchit la liste.

Dans ```controleurs-a-faire.js``` nous ajoutons ce controleur aux deux fonctions puisqu'on en aura besoin lors du chargement de la page, ```.creer```, et lorsque la liste est rafraîchie, ```.rafraichir```.

```
var ajouter = require('./controleurs-a-faire/ajouter')
var supprimerFait = require('./controleurs-a-faire/supprimer-fait')
var basculerFait = require('./controleurs-a-faire/basculer-fait')  // <-- nouveau

exports.creer = function(modele) {
 ajouter(modele)
 supprimerFait(modele)
 basculerFait(modele) // <-- nouveau
} 

exports.rafraichir = function(modele) {
 basculerFait(modele) // <-- nouveau
}
```

Il ne nous reste plus qu'à ajouter la possibilité de mettre à jour la clé ```text``` du modèle. Pour cela nous avons besoin d'ajouter un formulaire à l'élément de la liste que nous souhaitons modifier. 

### ```basculer-maj.js```

Créez un fichier ```basculer-maj.js``` dans ```lib/controleurs-a-faire```

```
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
```

Ce controleur référence toutes les balises ```<div class="liste-element-modif">``` dans une variable ```btns``` et pour chacune d'entre elles y ajoute un événement ```click``` qui ajoute une clé ```maj``` à l'objet du modèle que nous souhaitons mettre à jour. Pour que nous puissions n'en mettre à jour qu'un seul à la fois, les clés ```maj``` de tous les objets est marquée comme ```undefined```. Sauf celle qui nous intéresse.

Ajoutons le controleur à ```controleurs-a-faire.js```

```
var ajouter = require('./controleurs-a-faire/ajouter')
var supprimerFait = require('./controleurs-a-faire/supprimer-fait')
var basculerFait = require('./controleurs-a-faire/basculer-fait')  
var basculerMaj = require('./controleurs-a-faire/basculer-maj') // <-- nouveau

exports.creer = function(modele) {
 ajouter(modele)
 supprimerFait(modele)
 basculerFait(modele)
 basculerMaj(modele) // <-- nouveau
} 

exports.rafraichir = function(modele) {
 basculerFait(modele)
 basculerMaj(modele) // <-- nouveau
}
```

### ```mettre-a-jour.js```

Finalement nous avons besoin d'un controleur pour mettre à jour l'objet quand le formulaire de mise à jour est visible. Créez un fichier ```mettre-a-jour.js``` dans ```lib/controleurs```.

```
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
```

Ce controleur vérifie si un des objets du modèle a la clé ```maj``` marquée ```true```. Si c'est le cas, elle en garde l'index. Les balises ```<input id="liste-element-maj-input">``` et ```<button id="liste-element-maj-bouton">``` sont référencées par les variables ```input``` et ```btn```. Quand ```btn``` est clické, si la valeur d'```input``` n'est pas vide, la méthode ```.mettreAJour()``` du modèle est invoquée, la clé ```maj``` est marquée comme ```undefined```, la valeur de ```input``` est mise à zéro et la liste rafraîchie.

Ajoutons ce dernier controleur à ```controleurs-a-faire.js```

```
var ajouter = require('./controleurs-a-faire/ajouter')
var supprimerFait = require('./controleurs-a-faire/supprimer-fait')
var basculerFait = require('./controleurs-a-faire/basculer-fait')  
var basculerMaj = require('./controleurs-a-faire/basculer-maj')
var mettreAJour = require('./controleurs-a-faire/mettre-a-jour') // <-- nouveau

exports.creer = function(modele) {
 ajouter(modele)
 supprimerFait(modele)
 basculerFait(modele)
 basculerMaj(modele) 
} 

exports.rafraichir = function(modele) {
 basculerFait(modele)
 basculerMaj(modele)
 mettreAJour(modele) // <-- nouveau
}
```

Il n'y a pas besoin de l'ajouter à ```.creer()``` puisqu'il n'y a rien à mettre à jour au moment du chargement de la page. Ceci ne peut être fait que quand ```basculerMaj()``` a été invoqué.

## Tout mettre ensemble

Dans le fichier ```main.js``` à la racine du dossier du projet, nous allons maintenant créer:

* le modèle
* la vue 
* les controleurs

```
var Modele = require('./lib/Modele-a-faire')
var vue = require('./lib/vue-a-faire')
var controleurs = require('./lib/controleurs-a-faire')

var modele = new Modele()
vue(modele)
controleurs.creer(modele)
```

Ouvrez le terminal dans le dossier du projet et lancez le script ```build``` pour créer ```public/script.js``` et ouvrez ```index.html``` dans un navigateur.

Voilà pour la version ```vanilla``` de notre application. Cette approche est un peu laborieuse mais en écrivant tout le code nous-mêmes, nous avons une idée de ce qui ce passe dans une application de type MVC. Nous pouvons maintenant utiliser des scripts écrits par d'autres en connaissance de cause. C'est ce que nous allons faire dans les prochains chapitres.

 
