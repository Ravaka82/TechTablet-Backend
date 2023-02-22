const mongoose = require("mongoose");

const Commande = mongoose.model(
  "Commande",
    new mongoose.Schema({
      idProduct: {type:String},
      name : {type:String},
      color:{type: String},
      quantite:{type:Number},
      price:{type: mongoose.Types.Decimal128},
      status:{type:Boolean,default:false},
      utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' }
    })
);

module.exports = Commande;