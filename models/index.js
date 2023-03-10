const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.utilisateur = require("./utilisateur.model");
db.role = require("./role.model");
db.productChoice = require("./productChoice.model");
db.commande = require("./commande.model");

db.ROLES = ["client", "admin"];

module.exports = db;