require("dotenv").config();
const axios = require("axios");
const {Videogame, Genre} = require("../db.js");
const { API_KEY } = process.env;
const URL = `https://api.rawg.io/api/games/`;

const getVgameById = async (req, res) => {
  const { id } = req.params;

  const source = isNaN(id) ? "bd" : "api";//escojo por donde voy a hacer la busqueda del juego

  if (source === "api") {//hacemos la peticion a la api
    try {
      const info = await axios(`${URL}${id}?key=${API_KEY}`);
      const data = info.data;
      const game = {
        id: data.id,
        name: data.name,
        released: data.released,
        rating: data.rating,
        background_image: data.background_image,

        platforms: data.platforms.map((platf) => {//mapeo adentro del array de plataformas
          return " - " + platf.platform.name + " - ";
        }),

        genres: data.genres.map((genre) => {
          //mapeo adentro del array de generos
          return " - " + genre.name + " - ";
        }),

        description: data.description.replace(/<[^>]+>/g, ""),
        created: false,
      };

     
      res.status(200).json(game);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {//hacemos la peticion a la bd
    try {

      const gameDb = await Videogame.findOne({//nos traremos el juego que coincida con el id
        where: {
          id: id,
        },
        include: {//le incluimos los generos, traidos desde la db
          model: Genre,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });

      if (gameDb) {//si la respuesta es exitosa, le pusheamos los generos al juego
        let genres = [];
        for (let i = 0; i < gameDb.genres.length; i++) {
          genres.push(gameDb.genres[i].name);
        }
       
        const game = {
          id: gameDb.id,
          name: gameDb.name,
          released: gameDb.released,
          rating: gameDb.rating,
          background_image: gameDb.background_image,
          platforms: " - " + gameDb.platforms + " - ",
          genres: " - " + genres + " - ",
          description: gameDb.description.replace(/<[^>]+>/g, ""),
        };

        //console.log(source);
        res.status(200).json(game);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
   
  }
}

module.exports = getVgameById;
