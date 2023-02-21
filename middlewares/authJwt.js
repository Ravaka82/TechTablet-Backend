const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.utilisateur;
const Role = db.role;

verifyToken = (req, res, next) => {
  let token = req.session.token;

  if (!token) {
    return res.status(403).send({ message: "Je ne vois pas de token!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Non autoriser!" });
    }
    req.userId = decoded.id;
    next();
  });
};

isResponsableAtelier = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].nom === "admin") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require admin Role!" });
        return;
      }
    );
  });
};

isClient = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      Role.find(
        {
          _id: { $in: user.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
  
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].nom === "client") {
              next();
              return;
            }
          }
  
          res.status(403).send({ message: "Require Client Role!" });
          return;
        }
      );
    });
  };

const authJwt = {
  verifyToken,
  isResponsableAtelier,
  isClient
};
module.exports = authJwt;