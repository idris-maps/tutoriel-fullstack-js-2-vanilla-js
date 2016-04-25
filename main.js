var Modele = require('./lib/Modele-a-faire')
var vue = require('./lib/vue-a-faire')
var controleurs = require('./lib/controleurs-a-faire')

var modele = new Modele()
vue(modele)
controleurs.creer(modele)
