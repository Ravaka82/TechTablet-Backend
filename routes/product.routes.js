const controller = require("../controllers/product.controller");
module.exports = function(app) {
    app.get("/api/product/findAllProducts", controller.findAllProducts);
    app.post("/api/product/chooseproducts", controller.chooseproducts);
    app.get("/api/product/findProductChoice",controller.findProductChoice);
    app.delete("/api/product/deleteProductChoice/:_id", controller.deleteProductChoice);
}