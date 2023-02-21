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
}
exports.findProductsSelected = async (req, res) => {
  const { id } = req.params;
  const url = `https://dev.techtablet.fr/apiv2/products/10?column=name,pricettc,pictures,color.name,stock.available`;

  try {
    // Récupère tous les idProduct dans la base de données
    const products = await ProductChoose.find({});
    
    // Vérifie si l'un des idProduct correspond à l'ID dans l'URL
    for (let i = 0; i < products.length; i++) {
      if (products[i].idProduct === 10) {
        // Si un produit correspond, récupère les détails du produit à partir de l'URL
        const response = await axios.get(url);
        const productDetails = response.data;
        
        // Renvoie les détails du produit
        return res.json(productDetails);
      }
    }

    // Si aucun produit ne correspond, renvoie une erreur
    return res.status(404).json({ message: "Product not found" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.findProductsSelected = async (req, res) => {
  const dataProduct = [];
  maxid = 16744;
   const dbIds = await ProductChoose.find({}, "idProduct");
  for (const dbId of dbIds) {
    for (let index = 0; index <= maxid; index++) {
      if(dbId['idProduct'] == index){
        const url = `https://dev.techtablet.fr/apiv2/products/${index}?column=name,pricettc,pictures,color,stock`;
        const response = await axios.get(url);
        const productDetails = response.data;
        dataProduct.push(productDetails);
      }  
    }
  }
  console.log(dataProduct)
  res.send(dataProduct);
};
