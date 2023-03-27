import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Imagenes = styled.img`
  border-radius: 100px;
  float: left;
`;

const Carta = styled.div`
  display: inline-table;
  margin: 5px;
  border: 1px solid white;
  border-radius: 10px;
  background-color: #64dd17;
  padding: 30 px;
  width: 350px;
`;

export default function Detail() {
  const [game, setGame] = useState({});

  const { detailId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3001/videogames/detail/${detailId}`)
      .then((response) => response.json())
      .then((vGame) => {
        console.log(vGame)
        if (vGame.name) {
          setGame(vGame);
        } else {
          window.alert("No hay personajes con ese ID");
        }
      })
      .catch((err) => {
        window.alert(err.message);
      });
    return setGame({});
  }, [detailId]);

  return (
    <Carta>
      <Link to={"/home"}>
        <button>To Home</button>
      </Link>
      <h1>{game.name}</h1>
      <h2>id: {game.id}</h2>
      <h2>released: {game.released}</h2>
      <h2>rating: {game.rating}</h2>
      {/* <h2>platforms: {game.platforms}</h2>
      <h2>genres: {game.genres}</h2> */}
      <Imagenes src={game.background_image} alt="not found"></Imagenes>
      <h2>description: {game.description}</h2>
    </Carta>
  );
}
