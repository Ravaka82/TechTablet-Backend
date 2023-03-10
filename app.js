const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express();
app.use(cors());
var corsOptions = {
  origin: "http://localhost:8081" // Cors ho an'ny côté front
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "garage-session",
    secret: "$2y$10$tKovGS01FuBG7g./52jWwudJz/Guj5TCuu7BkD1Mgvh6QUJt/Uf86", // bcrypt 
    httpOnly: true
  })
);

const db = require("./models");
const dbConfig = require("./config/db.config");
const Role = db.role;


db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connecter avec succès");
    initial();
  })
  .catch(err => {
    console.error("Erreur de connexion", err);
    process.exit();
  });

function initial() { // Initialisation dans la base de donnee
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          nom: "client"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
          console.log("ajout 'client' au collection roles");
        });
  
        new Role({
          nom: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
          console.log("ajout 'admin' au collection roles ");
        });
      }
    });
  }

var allowCrossDomain = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control");

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
app.use(allowCrossDomain);
app.disable('etag');

//route de base
app.get("/", (req, res) => {
  res.json({ message: "Bienvenue API" });
});

//Route API
require('./routes/auth.routes')(app);
require('./routes/utilisateur.routes')(app);
require('./routes/role.routes')(app);
require('./routes/product.routes')(app);
require('./routes/commande.routes')(app);

// Demarrage serveur
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Vous etes connectee au port ${PORT}.`);
});