require("dotenv").config();
const axios = require("axios");
const { Genre } = require("../db.js");
const { API_KEY } = process.env;
const URL = `https://api.rawg.io/api/genres`;

const getGenres = async (req, res) => {
  try {
    const info = await axios(`${URL}?key=${API_KEY}`); //hacemos la peticion de generos en la api
    const data = info.data;
    const genres = data.results.map((genre) => { //recorremos el array de generos
      return genre.name;
    });

    //console.log(genres);
    genres.forEach((item) => {
      //recorremos el array que mapeamos de la api y grabamos los generos en la db
      Genre.findOrCreate({
        where: { name: item },
      });
    }); //creamos los generos en la db
    const genresDb = await Genre.findAll(); //buscamos os generos creados en la db
    res.status(200).json(genresDb); //devolvemos los generos
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getGenres;
