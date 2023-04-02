import axios from "axios"
import {GET_GAMES} from "./actionTypes"
//const URL = `https://api.rawg.io/api/games`;


 export const getGames = () => {
    return async function (dispatch) {
      const apiData = await axios.get(
        `http://localhost:3001/videogames`
        /* `${URL}?key=c3295696dd8a423294ddc8d25c5f1e35` */
      ); //(`${URL}?key=${API_KEY}`);

        const games = apiData.data.results;
        console.log(games)
      dispatch({ type: GET_GAMES, payload: games });
    };
}