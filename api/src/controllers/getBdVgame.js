const {Videogame} = require("../db.js")

const getBdVgame = async (game) => {
 
    try {
           const dBinfo = await Videogame.findAll({
             where: {
               name: game,
             },
           });

           const data = dBinfo.map((item) => {
             return {
               id: item.id,
               name: item.name,
               released: item.released,
               image: item.background_image,
             };
           });
           res.status(200).json(data);
    } catch (error) {
        throw new Error(error.message)
    }
};

module.exports = getBdVgame;
