const mongoose = require("mongoose");

const Commande = mongoose.model(
  "Commande",
    new mongoose.Schema({
      idProduct: {type:String},
      name : {type:String},
      color:{type: String},
      quantite:{type:Number},
      price:{type: String},
      status:{type:Boolean,default:false},
      image:{type:String},
      utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' }
    })
);
module.exports = Commande;