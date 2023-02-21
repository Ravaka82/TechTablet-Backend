const mongoose = require("mongoose");

const ProductChoice = mongoose.model(
  "ProductChoice",
    new mongoose.Schema({
      idProduct: {type:String},
      status: {type: String, default:"choose"},
    })
);

module.exports = ProductChoice;