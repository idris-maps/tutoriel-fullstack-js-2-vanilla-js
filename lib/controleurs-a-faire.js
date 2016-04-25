var ajouter = require('./controleurs-a-faire/ajouter')
var supprimerFait = require('./controleurs-a-faire/supprimer-fait')
var basculerFait = require('./controleurs-a-faire/basculer-fait')  
var basculerMaj = require('./controleurs-a-faire/basculer-maj')
var mettreAJour = require('./controleurs-a-faire/mettre-a-jour')

exports.creer = function(modele) {
 ajouter(modele)
 supprimerFait(modele)
 basculerFait(modele)
 basculerMaj(modele) 
} 

exports.rafraichir = function(modele) {
 basculerFait(modele)
 basculerMaj(modele)
 mettreAJour(modele)
}
