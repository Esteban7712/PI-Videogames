import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState } from "react";
import { getGames, getGenres, filterByGenre } from "../redux/actions";
//import Cards from "../Cards/Cards";
import Card from "../Card/Card"
import Pagination from "../Pagination/Pagination";

export default function Home() {
  const dispatch = useDispatch(); //instancio el dispatcher
  const allGames = useSelector((state) => state.games); //me traigo todos los juegos del estado
  const [currentPage, setCurrentPage] = useState(0); //en que pagina estoy renderizando
  //console.log(currentPage);
  // cuantos juegos voy a mostrar por pagina
  const [gameXpage, setGameXpage] = useState(15); //eslint-disable-line
  //console.log(gameXpage);
  const indexOfLastGame = currentPage * gameXpage; //saber en que pagina queda el ultimo juego renderizado
  console.log(indexOfLastGame);
  const indexOfFirstGame = indexOfLastGame - gameXpage; //saber en que pagina esta el primer juego renderizado
  console.log(indexOfFirstGame);
  const currentGames = allGames.slice(indexOfLastGame, indexOfFirstGame); //son los juegos que voy a tener por pagina
  console.log(currentGames.length);

  let pagination = (pageNumber) => {
    //console.log(pageNumber)
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    //cuando el componente se monte ejecuto la accion de traerme los juegos
    dispatch(getGames());
    dispatch(getGenres());
  }, [dispatch]);

  /* useEffect(() => {
    //cuando el componente se monte ejecuto la accion de traerme los generos
    dispatch(getGenres());
  }, [dispatch]); */

  //Paginado

  const resetHandler = (e) => {
    //cuando se pulse el boton reset ejecuta traer todos los juegos
    e.preventDefault();
    dispatch(getGames());
  };

  function handleGenreFilter(e) {
    dispatch(filterByGenre(e.target.value));
  }
  const genres = useSelector((state) => state.genres); //me traigo los generos desde el estado
  //console.log(genres);

  return (
    <div>
      <button
        onClick={(e) => {
          resetHandler(e);
        }}
      >
        Reset
      </button>
      <div>
        <select>
          <option value="asc">A - Z</option>
          <option value="dsc">Z - A</option>
        </select>
        <select>
          <option value="r+">Rating +</option>
          <option value="r-">Rating -</option>
        </select>
        <select>
          <option value="all">All</option>
          <option value="api">API</option>
          <option value="db">DB</option>
        </select>
        <select onChange={(e) => handleGenreFilter(e)}>
          {/* Llamo al filtro de generos para traerlos del estado */}
          <option value="All">All Genres</option>
          {genres.sort().map((genre) => (
            <option key={genre.name} value={genre.name}>
              {/* genero varias etiquetas de opciones para mostrar cada uno de los generos */}
              {genre.name}
            </option>
          ))}
        </select>
        <Pagination
          key={1}
          gamesXpage={gameXpage}
          allGames={allGames.length}
          pagination={pagination}
        />
      </div>
      {currentGames?.map((game) => {
        return (
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
          />
        );
      })}
      <div>
        <Pagination
          key={1}
          gamesXpage={gameXpage}
          allGames={allGames.length}
          pagination={pagination}
        />
      </div>
    </div>
  );
}
