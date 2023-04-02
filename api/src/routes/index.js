const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getGenres      = require("../controllers/getGenres.js");
const getVgameById   = require("../controllers/getVgameById.js");
const getBdVgame     = require("../controllers/getBdVgame.js");
const postVideogame  = require("../controllers/postVideogame.js");
const deleteBdVgame  = require("../controllers/deleteBdVgame.js");
const getVideogames  = require("../controllers/getVideogames.js");
const getVgameByName = require("../controllers/getVgameByName.js");

const router = Router();

//router.get("/videogames/:id", getVgameById);
router.get("/videogames", getVideogames);
router.get("/videogames/detail/:id", getVgameById);
router.get("/videogames/?name=name", getVgameByName);
router.get("/videogames/genres", getGenres);
router.get("/videogames/new", getBdVgame);
router.post("/videogames/new", postVideogame);
router.delete("/videogames/new/:id", deleteBdVgame);

module.exports = router;
