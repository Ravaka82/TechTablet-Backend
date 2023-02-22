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
            image:req.body.image,
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
exports.findCommandeById = async (req, res) => {
  try {
    const utilisateurId = req.params.utilisateurId;
    const commandes = await commande.find({ utilisateur: utilisateurId, status: false }).populate('utilisateur');
    console.log(commandes)
    if (!commandes || commandes.length === 0) {
      return res.status(404).send({ message: "Aucune commande trouvée pour cet utilisateur" });
    }

    res.send(commandes);

  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.findAndUpdateCommands = async (req, res) => {
  try {
    const utilisateurId = req.params.utilisateurId;
    const commandes = await commande.find({ utilisateur: utilisateurId }).populate('utilisateur');
    console.log(commandes);
    if (!commandes || commandes.length === 0) {
      return res.status(404).send({ message: "Aucune commande trouvée pour cet utilisateur" });
    }

    const updatedCommands = await Promise.all(commandes.map(async (commande) => {
      if (!commande.status) {
        commande.status = true;
        await commande.save();
      }
      return commande;
    }));

    res.send(updatedCommands);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
exports.getHistoriqueCommandes = async (req, res) => {
  try {
    const commandes = await commande.aggregate([
      { $match: { status: true } },
      { $group: { _id: "$utilisateur", totalQuantite: { $sum: "$quantite" }} },
      { $lookup: { from: "utilisateurs", localField: "_id", foreignField: "_id", as: "utilisateur" } },
      { $unwind: "$utilisateur" },
      { $project: { "utilisateur._id": 1, "utilisateur.nom": 1, "utilisateur.prenom": 1, totalQuantite: 1, "utilisateur.totalpayer": 1} }
    ]);
    console.log(commandes)
    if (!commandes || commandes.length === 0) {
      return res.status(404).send({ message: "Aucune commande trouvée" });
    }

    res.send(commandes);

  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
exports.detailCommande = async (req, res) => {
  try {
    const utilisateurId = req.params.utilisateurId;
    const commandes = await commande.find({
      utilisateur: utilisateurId,
      status: true
    }).select("name price quantite image");

    if (!commandes || commandes.length === 0) {
      return res.status(404).send({ message: "Aucune commande trouvée" });
    }

    res.send(commandes);

  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

