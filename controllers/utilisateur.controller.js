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