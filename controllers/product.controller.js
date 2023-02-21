const axios = require('axios');

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
    console.log(dataProduct)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    res.send(dataProduct)
}
