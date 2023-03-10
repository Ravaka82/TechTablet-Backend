const mongoose = require("mongoose");
const Utilisateur = mongoose.model(
  "Utilisateur",
  new mongoose.Schema({
    nom: String,
    prenom: String,
    email: String,
    mot_de_passe: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    totalpayer: {type:String,default:" "},
    lieu_livraison: {type:String,default:" "}
  })
);
module.exports = Utilisateur;