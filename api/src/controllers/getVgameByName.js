require("dotenv").config();
const axios = require("axios");
//const Videogame = require("../db");
const { API_KEY } = process.env;
const getVideoGames = require("./getVideogames.js");
const URL = `https://api.rawg.io/api/games`;

const getVgameByName = async (req, res) => {
  const  name  = req.query.name;

  let allGames = await getVideoGames()
  //console.log(allGames.results);
  if (name) {
    let gameByName = await allGames.filter((item) => {
          if (item.name.toLowerCase().includes(name.toLowerCase()))
        gameByName.length ?
          res.status(200).send(gameByName) :
          res.status(404).send("Game not Found")
    })
    
  } else {
    res.status(200).json(allGames)
  } 



  /* if (name) {
    try {
      const info = await axios.get(`${URL}?search=${name}&key=${API_KEY}`); //pedimos el juego por nombre
      const data = info.data.results;
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
        platforms: data.platforms.map((platf) => {
          //buscamos dentro del array plataformas
          return platf.platform.name;
        }),

        genres: data.genres.map((genre) => {
          //buscamos dentro del array generos
          return genre.name;
        }),
        description: data.description,
        created: false,
      };
      //console.log(game);
      res.status(200).json(game);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }  *//* else {
    try {
      const bdGames = await Videogame.findAll({ where: { name: name } });
      const apiGames = getVideoGames().filter((item) => item.name === name);
      const allGames = [...bdGames, ...apiGames];
      res.status(200).json(allGames);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } */
};

module.exports = getVgameByName;
