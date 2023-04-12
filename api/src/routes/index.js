const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getGenres = require("../controllers/getGenres.js");
const getVgameById = require("../controllers/getVgameById.js");
const postVideogame = require("../controllers/postVideogame.js");
const getVideogames = require("../controllers/getVideogames.js");
const getPlatforms = require("../controllers/getPlatforms.js");
const router = Router();

router.get("/videogames", getVideogames);
router.get("/videogames/detail/:id", getVgameById);
router.get("/videogames/genres", getGenres);
router.get("/videogames/platforms", getPlatforms);
router.post("/videogame", postVideogame);

http: module.exports = router;
