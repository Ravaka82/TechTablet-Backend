const controller = require("../controllers/product.controller");
module.exports = function(app) {
    app.get("/api/product/findAllProducts", controller.findAllProducts);
}