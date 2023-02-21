  exports.clientBoard = (req, res) => {
    res.status(200).send("Contenu client");
  };
  
  exports.responsableAtelierBoard = (req, res) => {
    res.status(200).send("Contenu admin");
  };
  