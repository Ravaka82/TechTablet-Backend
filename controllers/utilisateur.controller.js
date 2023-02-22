  
  const { utilisateur } = require("../models");
  exports.clientBoard = (req, res) => {
    res.status(200).send("Contenu client");
  };
  
  exports.responsableAtelierBoard = (req, res) => {
    res.status(200).send("Contenu admin");
  };
    
  exports.findUtilisateurById = async (req, res) => {
    try {
      const utilisateurId = req.params.utilisateurId;
      const utilisateurs = await utilisateur.find({utilisateur: utilisateurId });
      console.log(utilisateurs)
      if (!utilisateurs || utilisateurs.length === 0) {
        return res.status(404).send({ message: "Aucun utilisateur trouvé" });
      }
  
      res.send(utilisateurs);
  
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };
  exports.updateUtilisateurAddress = async (req, res) => {
    try {
      const utilisateurId = req.params.utilisateurId;
      const newAddress = req.body.lieu_livraison;
      const totalPayer = req.body.totalpayer
  
      const updatedUtilisateur = await utilisateur.updateOne(
        { _id: utilisateurId },
        { $set: { lieu_livraison: newAddress,  totalpayer: totalPayer } },
      );
  
      if (!updatedUtilisateur || updatedUtilisateur.nModified === 0) {
        return res.status(404).send({ message: "Utilisateur non trouvé" });
      }
  
      res.send({ message: "Adresse livraison mise à jour avec succès" });
  
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };