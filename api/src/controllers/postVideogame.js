const {Videogame} = require("../db.js")

const postVideogame = async (req, res) => {
    try {
      const {
        
        name,
        description,
        platforms,
        background_image,
        released,
        rating,
        
      } = req.body;
      if (
        
        !name ||
        !description ||
        !platforms ||
        !background_image ||
        !released ||
        !rating
    
      ) {
        //return res.status(404).json({ message: error.message }); //{ message: "Complete all Fields" }
      }
      const newVideogame = await Videogame.create({
        
        name,
        description,
        platforms,
        background_image,
        released,
        rating,
        
      });
      return res.status(201).json(newVideogame);
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
};

module.exports = postVideogame;
