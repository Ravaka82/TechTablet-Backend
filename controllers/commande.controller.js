const db = require("../models");
const utilisateur = db.utilisateur;
const commande = db.commande;
exports.createCommande = async(req, res) => { // insertion commande d'un utilisateur
  try {
    const utilisateurId = req.body.utilisateurId;
    const idProduct = req.body.idProduct;

    // Vérifier si la commande existe déjà pour ce produit
    const existingCommande = await commande.findOne({ idProduct: idProduct, utilisateur: utilisateurId });

    if (existingCommande) {
      // Si la commande existe déjà, augmenter la quantité
      existingCommande.quantite += req.body.quantite;
      existingCommande.save((err, updatedCommande) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.send({ message: "commande was updated successfully!" });
      });
    } else {
      // Si la commande n'existe pas encore, la créer
      utilisateur.findOne({ _id: utilisateurId }, (err, utilisateur) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if (!utilisateur) {
          res.status(404).send({ message: "Utilisateur not found" });
          return;
        }
        const commandes = new commande({
            idProduct: idProduct,
            name : req.body.name,
            color:req.body.color,
            quantite:req.body.quantite,
            price:req.body.price,
            status:req.body.status,
            utilisateur: utilisateurId
        });
        commandes.save((err, commandes) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res.send({ message: "commande was saved successfully!" });
        });
      });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
