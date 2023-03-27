require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;
const URL = `https://api.rawg.io/api/games`;

const getVideogames = async (req, res) => {
  
  try {
    const info = await axios(`${URL}?key=${API_KEY}`); //`${URL}?key=${API_KEY}`
    const data = info.data;
    //console.log(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getVideogames;
