import axios from "axios";
import {
  GET_GAMES,
  GET_GENRES,
  GET_PLATFORMS,
  FILTER_BY_GENRE,
  FILTER_BY_SOURCE,
  ORDER_BY_NAME,
  ORDER_BY_RATING,
  SEARCH_BY_NAME,
} from "./actionTypes";

export const getGames = () => {//hago la peticion al back para que me traiga los juegos para enviarlos al reducer
  return async function (dispatch) {
    const Info = await axios.get(`http://localhost:3001/videogames`);
    const games = Info.data;
    dispatch({ type: GET_GAMES, payload: games });
  };
};

export function getGenres() {//hago la peticion al back para que me traiga los generos y mandarlos al reducer
  return async function (dispatch) {
    var Info = await axios.get(`http://localhost:3001/videogames/genres`);
    const genres = Info.data;
    dispatch({ type: GET_GENRES, payload: genres });
  };
}

export function getPlatforms() {
  //hago la peticion al back para que me traiga las plataformas y mandarlas al reducer
  return async function (dispatch) {
    var Info = await axios.get(`http://localhost:3001/videogames/platforms`);
    const platforms = Info.data;
    dispatch({ type: GET_PLATFORMS, payload: platforms });
  };
}

export function filterByGenre(payload) {//recibo la forma en que voy a filtrar por genero y se la envio al reducer
  return {
    type: FILTER_BY_GENRE,
    payload,
  };
}

export function filterBySource(payload) {
  //recibo la forma en que voy a filtrar por fuente y se la envio al reducer
  return {
    type: FILTER_BY_SOURCE,
    payload,
  };
}

export function orderByName(payload) {
  //recibo la forma en que voy a filtrar por nombre y se la envio al reducer
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}

export function orderByRating(payload) {
  //recibo la forma en que voy a filtrar por rating y se la envio al reducer
  return {
    type: ORDER_BY_RATING,
    payload,
  };
}

export function searchByName(name) {
  // recibo las letras para hacer la busqueda por nombre y busco en el back los juegos que contengan esas letras en el nombre y los mando a reducer
  return async function (dispatch) {
    try {
      var Info = await axios.get(
        `http://localhost:3001/videogames?name=${name}`
      );
      const gamesByName = Info.data;
      dispatch({ type: SEARCH_BY_NAME, payload: gamesByName });

    } catch (error) {
      console.log(error)
    }
  };
}

export function postGame(gameToCreate) {
  //recibo la info necessaria para crear un juego y se la mando al back y al reducer para el posteo
  return async function () {
    try {
      const post = await axios.post(
        `http://localhost:3001/videogame`,
        gameToCreate
      );
      return post;
    
    } catch (error) {
      console.log(error);
    }
  };
}
