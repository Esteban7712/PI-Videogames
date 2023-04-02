require("dotenv").config();
const axios = require("axios");
const {Videogame, Genre} = require("../db.js");
const { API_KEY } = process.env;
const URL = `https://api.rawg.io/api/games/`;

const getVgameById = async (req, res) => {
  const { id } = req.params;

  const source = isNaN(id) ? "bd" : "api";

  if (source === "api") {//hacemos la peticion a la api
    try {
      const info = await axios(`${URL}${id}?key=${API_KEY}`); //`${URL}${id}?key=${API_KEY}`
      const data = info.data;
      const game = {
        id: data.id,
        name: data.name,
        released: data.released,
        rating: data.rating,
        background_image: data.background_image,

        platforms: data.platforms.map((platf) => {
          return  " - " +platf.platform.name + " - ";
        }),

        genres: data.genres.map((genre) => {
          return " - " + genre.name + " - ";
        }),

        description: data.description,
        created: false,
      };

      //console.log(game.genres);
      res.status(200).json(game);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {//hacemos la peticion a la bd
    try {

      game = await Videogame.findByPk(id, {
        include: {
          model: Genre
        }
      })
      //console.log(source)
      res.status(200).json(game);

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  
};

module.exports = getVgameById;
