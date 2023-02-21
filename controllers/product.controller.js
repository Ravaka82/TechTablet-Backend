const axios = require('axios');
const db = require("../models");
const ProductChoose = db.productChoice;

exports.findAllProducts = async (req, res) => {//listes id des produits
    let dataProduct = [];
        url = `https://dev.techtablet.fr/apiv2/products/`
        await axios.get(url).then(async response =>{
            let newListData =response.data; 
            if(newListData != []){
                for(let item of newListData){
                    dataProduct.push({
                        id : item,
                      });
                }
            }
        });       
    // console.log(dataProduct)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    res.send(dataProduct)
}
exports.chooseproducts = (req, res) => {// choisir produits
    const idProduct = req.body.idProduct;
  
    ProductChoose.countDocuments({}, (err, count) => {
      if (err) {
        return res.status(500).send({ message: err });
      }
  
      if (count >= 10) {
        return res.status(400).send({ message: "Maximum number of products reached" });
      }
  
      ProductChoose.findOne({ idProduct: idProduct }, (err, existingProduct) => {
        if (err) {
          return res.status(500).send({ message: err });
        }
  
        if (existingProduct) {
          return res.status(400).send({ message: "Product already exists" });
        }
  
        const productChoose = new ProductChoose({
          idProduct: idProduct,
        });
  
        productChoose.save((err, productChoose) => {
          if (err) {
            return res.status(500).send({ message: err });
          }
  
          res.send({ message: "Product was chosen successfully", productChoose });
        });
      });
    });
};
exports.findProductChoice = (req, res) => { //listes des produits selectionner 
    console.log(req.body)
    ProductChoose.find(
      (err, productChoice) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.send(productChoice);
      }
    )
  }
exports.deleteProductChoice = (req, res) => {//supprimer  produits selectionner 
    ProductChoose.deleteOne({ _id: req.params._id })
    .then(() => {
        res.send({ message: "Product deleted successfully" });
    })
    .catch((err) => {
        res.status(500).send({ message: "Error deleting product" });
    });
  };