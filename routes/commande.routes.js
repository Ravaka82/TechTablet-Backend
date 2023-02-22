const controller = require("../controllers/commande.controller");
module.exports = function(app) {
    app.post("/api/product/createCommande", controller.createCommande);
    app.get("/api/product/findCommandeById/:utilisateurId",controller.findCommandeById);
    app.post("/api/product/findAndUpdateCommands/:utilisateurId",controller.findAndUpdateCommands);
    app.get("/api/product/getHistoriqueCommandes",controller.getHistoriqueCommandes);
}
