require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;
const URL = `https://api.rawg.io/api/platforms`;

const getPlatforms = async (req, res) => {
  try {
    const info = await axios(`${URL}?key=${API_KEY}`); //hacemos la peticion de plataformas en la api
    const data = info.data;
    const platforms = data.results.map((platform) => {
      //recorremos el array de plataformas
      return platform.name;
    });
    
    res.status(200).json(platforms); //devolvemos las plataformas
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getPlatforms;
