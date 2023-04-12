const { Videogame, Genre } = require("../db.js");

const postVideogame = async (req, res) => {
  try {
    let {
      name,
      description,
      platforms,
      background_image,
      released,
      rating,
      genres
    } = req.body;// recibo toda la informacion que llega por body

    if (
      //valido que si tenga todos los campos completos

      !name ||
      !description ||
      !platforms ||
      !background_image ||
      !released ||
      !rating
    ) {
      res.status(400).json({ message: error.message });
    }

    name = name.toLowerCase();
    const exists = await Videogame.findOne({ where: {name: name }//valido si ya hay otro juego creado con el mismo nombre
})
    if (exists) {
      res.status(400).json("Game already created!");
    }

   
    //platforms = platforms.toString();
    const newVideogame = await Videogame.create({
      name,
      description,
      platforms,
      background_image,
      released,
      rating,
    });

    const genreDb = await Genre.findAll({//buscar los generos en la bd
      where: { name: genres }
    });
    newVideogame.addGenre(genreDb);//asociar generos al videojuego
    

    res.status(201).json(newVideogame);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = postVideogame;
