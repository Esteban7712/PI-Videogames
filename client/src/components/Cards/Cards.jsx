import Card from "../Card/Card.jsx";
import React from "react";
//import { useState, useEffect } from "react";
//import { useSelector } from "react-redux";

export default function Cards({ currentGames }) {
  //me traigo los juegos que debo mostrar por pagina
  //const games = useSelector((state) => state.games);
  //console.log(currentGames);

  /* const [message, setmessage] = useState("Loading...");//muestro un loader mientras llega la informacion al front

  useEffect(() => {
    setTimeout(() => {
      if (currentGames.length === 0) {
        setmessage("Not found");
      }
    }, 5000);
  }, [currentGames]); */


  const games = currentGames;

  return (
    <div>
      {games.map((game) => (
        <Card
          key={game.id}
          name={game.name}
          released={game.released}
          rating={game.rating}
          background_image={game.background_image}
          id={game.id}
          platforms={game.platforms}
          genres={game.genres}
          description={game.description}
          /* onClose={props.onClose} */
        />
      ))}
    </div>
  );
}
