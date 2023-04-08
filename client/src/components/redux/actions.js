import axios from "axios";
import { GET_GAMES, GET_GENRES, FILTER_BY_GENRE } from "./actionTypes";

export const getGames = () => {
  return async function (dispatch) {
    const Info = await axios.get(`http://localhost:3001/videogames`);
    const games = Info.data;
    dispatch({ type: GET_GAMES, payload: games });
  };
};

export function getGenres() {
  return async function (dispatch) {
    var Info = await axios.get(`http://localhost:3001/videogames/genres`);
    const genres = Info.data;
    dispatch({ type: GET_GENRES, payload: genres });
  };
}

export function filterByGenre(payload) {
  return {
    type: FILTER_BY_GENRE,
    payload,
  };
}
