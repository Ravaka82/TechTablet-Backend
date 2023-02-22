const controller = require("../controllers/commande.controller");
module.exports = function(app) {
    app.post("/api/product/createCommande", controller.createCommande);
}
