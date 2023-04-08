import { GET_GAMES, GET_GENRES, FILTER_BY_GENRE } from "./actionTypes";

const initialState = {
  games: [],
  genres: [],
  filtered: []
};


const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GAMES:
      return {
        ...state,
        games: action.payload,
        filtered: action.payload,
      };

    case GET_GENRES:
      return { ...state, genres: action.payload };

    case FILTER_BY_GENRE:
      const allVgames = state.filtered;//lleno el array de filtrados con todos los juegos
      
      const genrefilter =
        action.payload === "All"
          ? allVgames
          : allVgames.filter((p) => p.genres.includes(action.payload));
      if (genrefilter.length === 0) {
        alert(`No videogames found for ${action.payload} genre`);
        return state;
      } else {
        return {
          ...state,
          videogames: genrefilter,
        };
      }

    default:
      return { ...state };
  }
};

export default rootReducer;
