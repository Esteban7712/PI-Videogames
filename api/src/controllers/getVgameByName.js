const getVideoGames = require("./getVideogames.js");


const getVgameByName = async (req, res) => {
  const  name  = req.query.name;

  let allGames = await getVideoGames()//nos traemos los juegos 
  //console.log(allGames.results);
  if (name) {
    let gameByName = await allGames.filter((item) => {//filtramos los juegos que coincidan con las palabras que nos llegan por query
          if (item.name.toLowerCase().includes(name.toLowerCase()))
        gameByName.length ?
          res.status(200).json(gameByName) :
          res.status(404).json("Game not Found")
    })
    
  } else {
    res.status(200).json(allGames)
  } 
};

module.exports = getVgameByName;
