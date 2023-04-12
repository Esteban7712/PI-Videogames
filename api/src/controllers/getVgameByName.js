//require("dotenv").config();
//const axios = require("axios");
//const Videogame = require("../db");
//const { API_KEY } = process.env;
const getVideoGames = require("./getVideogames.js");
//const URL = `https://api.rawg.io/api/games`;

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
};

module.exports = getVgameByName;
