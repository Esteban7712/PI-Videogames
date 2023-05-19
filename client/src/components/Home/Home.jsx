import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState } from "react";
import {
  getGames,
  getGenres,
  filterByGenre,
  filterBySource,
  orderByName,
  orderByRating,
} from "../redux/actions";
import Card from "../Card/Card"
import Pagination from "../Pagination/Pagination";
import loader from "../../Images/loading1.gif";

export default function Home() {
  const dispatch = useDispatch(); //instancio el dispatcher
  const allGames = useSelector((state) => state.games); //me traigo todos los juegos del estado
  const genres = useSelector((state) => state.genres); //me traigo los generos desde el estado

  //Paginado
  const [currentPage, setCurrentPage] = useState(1); //en que pagina estoy renderizando
  // cuantos juegos voy a mostrar por pagina
  const [gameXpage, setGameXpage] = useState(15); //eslint-disable-line
  const indexOfLastGame = currentPage * gameXpage; //saber en que pagina queda el ultimo juego renderizado
  const indexOfFirstGame = indexOfLastGame - gameXpage; //saber en que pagina esta el primer juego renderizado
  const currentGames = allGames.slice(indexOfFirstGame, indexOfLastGame); //son los juegos que voy a tener por pagina

  //aqui le digo que orden es el que debe tomar alfabeticamente
  const [orderAlph, setOrderAlph] = useState(""); // eslint-disable-line

  const [orderRat, setOrderRat] = useState(""); // eslint-disable-line

  let pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    //cuando el componente se monte ejecuto la accion de traerme los juegos y generos
    dispatch(getGames());
    dispatch(getGenres());
  }, [dispatch]);

  function resetHandler(e) {
    //cuando se pulse el boton reset ejecuta traer todos los juegos
    e.preventDefault();
    dispatch(getGames());
    setCurrentPage(1);
  };

  function handleGenreFilter(e) {
    //activo el filtrado por generos cuando se pulse el select de generos
    dispatch(filterByGenre(e.target.value));
    setCurrentPage(1);
  }

  function handleSourceFilter(e) {
    //activo el filtrado por origen cuando se pulse el select de origen
    dispatch(filterBySource(e.target.value));
  }

  function handleSort(e) {
    //activo el ordenamiento alfabetico cuando se pulse el select de order
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrderAlph(`ordered ${e.target.value}`); //uso este estado local para enviar el payload al reducer
  }

  function handleRating(e) {
    //activo el ordenamiento por rating cuando se pulse el select de rating
    e.preventDefault();
    dispatch(orderByRating(e.target.value));
    setCurrentPage(1);
    setOrderRat(`ordered ${e.target.value}`); //uso este estado local para enviar el payload al reducer
  }

  return (
    <div>
      <button //cuando pulso el boton de reset se va a la pagina 1 del home y anula los filtros
        onClick={(e) => {
          resetHandler(e);
        }}
      >
        Reset
      </button>
      <div>
        <select onChange={(e) => handleSort(e)}>
          <option value="alph">Alph</option>
          <option value="asc">A - Z</option>
          <option value="dsc">Z - A</option>
        </select>
        <select onChange={(e) => handleRating(e)}>
          <option value="rat">Rating</option>
          <option value="r+">Rating +</option>
          <option value="r-">Rating -</option>
        </select>
        <select onChange={(e) => handleSourceFilter(e)}>
          <option value="All">Source</option>
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
      {currentGames.length ? (
        currentGames.map((game) => {
          /* //mapeo las tarjetas que me llegan despues del paginado */
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
        })
      ) : (
        <div>
          <img src={loader} alt="Loading..."></img>
        </div>
      )}
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
