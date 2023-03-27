require("dotenv").config();
const axios = require("axios");
const Videogame = require("../db");
const { API_KEY } = process.env;
const getVideoGames = require("./getVideogames.js")
const URL = `https://api.rawg.io/api/games`;

const getVgameByName = async (req, res) => {
  const { name } = req.query;

  if (name) {
    
    try {

      const info = await axios(`${URL}?search=${name}&key=${API_KEY}`);//pedimos el juego por nombre
      const data = info.data;
      console.log(data);
      if (!data.length) {
        throw new Error("Game not Found");
      }
      const game = {
        id: data.id,
        name: data.name,
        released: data.released,
        rating: data.rating,
        image: data.background_image,
        platforms: data.platforms.map((platf) => {//buscamos dentro del array plataformas
          return { name: platf.platform.name };
        }),

        genres: data.genres.map((genre) => {//buscamos dentro del array generos
          return { name: genre.name };
        }),
        description: data.description,
        created: false
      };
      //console.log(game);
      res.status(200).json(game);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    try {

      const bdGames = await Videogame.findAll({ where: { name: name } });
      const apiGames = getVideoGames().filter((item) => item.name === name);
      const allGames = [...bdGames, ...apiGames];
      res.status(200).json(allGames);

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
    
  }
};

module.exports = getVgameByName;
