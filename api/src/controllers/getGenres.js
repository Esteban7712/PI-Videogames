require("dotenv").config();
const axios = require("axios");
const {Genre} = require("../db.js")
const { API_KEY} = process.env;
const URL = `https://api.rawg.io/api/genres`; //?key=${API_KEY}`;

const getGenres = async (req, res) => {
  try {
    const info = await axios(`${URL}?key=${API_KEY}`); //`${URL}${id}?key=${API_KEY}`
    const data = info.data;
    const genres = data.results.map((genre) => {
      return { id: genre.id, name: genre.name };
    });

    console.log(genres);
    res.status(200).json(genres);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* const saveApiData = async () => {
  try {
    const dataToSync = await getGenres();
    await Genre.bulkCreate(dataToSync);
  } catch (error) {
    return { error: error.message };
  }
}; */

module.exports = getGenres//, saveApiData;
