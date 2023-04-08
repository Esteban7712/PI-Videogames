require("dotenv").config();
const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;
const URL = `https://api.rawg.io/api/games`;

const getApiGames = async () => {
  //traemos la info de la api
  let allApiGames = []
  let pages = 0;
  let info = await axios.get(`${URL}?key=${API_KEY}`);
  while (pages < 6) {
    // hago un ciclo para llamar varias veces a la api y traer los 100 juegos
    pages++;
    //console.log(pages)
    const games = await info.data.results.map((data) => {
      //mapeo el array con todos los datos que trae la api
      return {
        id: data.id,
        name: data.name,
        released: data.released,
        rating: data.rating,
        background_image: data.background_image,
        platforms: data.platforms,
        genres: data.genres,
      };
    });
    allApiGames = [...allApiGames, ...games]
    info = await axios.get(info.data.next)
      //console.log(allApiGames); //vuelvo a llamar a la API con next
  }
  
  return allApiGames;
};

const getDbGames = async () => {
  //traemos la info de la db

  //console.log(Videogame)
  const dbInfo = await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  //console.log(dbInfo);
  return dbInfo;
};

const getAllGames = async () => {
  //concatenamos todo los juegos

  const apiInfo = await getApiGames();
  //console.log(apiInfo)
  const dbInfo = await getDbGames();
  //console.log(dbInfo)
  const allVgames = dbInfo.concat(apiInfo);;
  //console.log(allVgames)
  return allVgames;
};

const getVideoGames = async (req, res) => {

  const name = req.query.name;//aclaramos lo que nos va a llegar por query
  //console.log(name);
  let allGames = await getAllGames();
  //console.log(allGames.results);
  if (name) {
    let gameByName = await allGames.filter((item) => //filtramos los nombres por minusculas
      item.name.toLowerCase().includes(name.toLowerCase())
    );
    gameByName.length
      ? res.status(200).send(gameByName)
      : res.status(404).send("Game not Found");
  } else {
    res.status(200).json(allGames);
  }
};

module.exports = getVideoGames;
