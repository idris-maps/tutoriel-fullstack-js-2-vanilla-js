var vue = require('../vue-a-faire')
var controleurs = require('../controleurs-a-faire')

module.exports = function(modele) {
 vue(modele)
 controleurs.rafraichir(modele)
}
