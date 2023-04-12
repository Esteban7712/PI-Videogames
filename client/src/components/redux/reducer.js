import {
  GET_GAMES,
  GET_GENRES,
  GET_PLATFORMS,
  FILTER_BY_GENRE,
  FILTER_BY_SOURCE,
  ORDER_BY_NAME,
  ORDER_BY_RATING,
  SEARCH_BY_NAME,
  POST_GAME,
} from "./actionTypes";

const initialState = {
  games: [],
  allGames: [],
  genres: [],
  platforms: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GAMES: //me traigo todos los juegos
      return {
        ...state,
        games: action.payload,
        allGames: action.payload,
      };

    case GET_GENRES: //me traigo todos los generos
      return { ...state, genres: action.payload };

    case GET_PLATFORMS://me traigo todas las plataformas
      return { ...state, platforms: action.payload };

    case FILTER_BY_GENRE: //filtro por generos
      const allVgames = state.allGames; //uso el estado que siempre tiene todos los juegos
      var genresFinded = [];
      allVgames.map((d) => {
        //busco en todos los juegos, los que coincida el genero que necesito
        const genresFinder = d.genres.map((e) => {
          if (typeof e === "object") {
            //valido que los generos si esten en un objeto
            return e.name;
          } else {
            return e;
          }
        });
        if (genresFinder.includes(action.payload)) {
          //si el genero coincide, lo agrego al array
          genresFinded.push(d);
        }
      });

      const filteredGenres =
        action.payload === "All" ? allVgames : genresFinded;

      return {
        ...state,
        games: filteredGenres,
      };

    case FILTER_BY_SOURCE: //filtro por origen
      const allGames = state.allGames; //uso el estado que siempre tiene todos los juegos
      const filteredBySource =
        action.payload === "db"
          ? allGames.filter((g) => g.created)
          : allGames.filter((g) => !g.created);

      return {
        ...state,
        games: action.payload === "All" ? state.allGames : filteredBySource,
      };

    case ORDER_BY_NAME: //ordeno por orden alfabetico
      let sorted =
        action.payload === "asc" //ordena de forma ascendente
          ? state.allGames.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1; // si es 1 coloca el item a la derecha
              }
              if (b.name.toLowerCase() > a.name.toLowerCase()) {
                return -1; //si es -1 coloca el item a la izq
              }
              return 0; // si es 0 deja el item quieto
            })
          : state.games.sort(function (a, b) {
              //ordena de forma descendente
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return -1; //si es -1 coloca el item a la izq
              }
              if (b.name.toLowerCase() > a.name.toLowerCase()) {
                return 1; // si es 1 coloca el item a la derecha
              }
              return 0; // si es 0 deja el item quieto
            });

      return {
        ...state,
        games: sorted,
      };

    case ORDER_BY_RATING: //ordenamos por rating
      let sortedRat =
        action.payload === "r+" //ordena de forma ascendente
          ? state.allGames.sort(function (a, b) {
              if (a.rating > b.rating) {
                return -1; // si es 1 coloca el item a la derecha
              }
              if (b.rating > a.rating) {
                return 1; //si es -1 coloca el item a la izq
              }
              return 0; // si es 0 deja el item quieto
            })
          : state.games.sort(function (a, b) {
              //ordena de forma descendente
              if (a.rating > b.rating) {
                return 1; //si es -1 coloca el item a la izq
              }
              if (b.rating > a.rating) {
                return -1; // si es 1 coloca el item a la derecha
              }
              return 0; // si es 0 deja el item quieto
            });

      return {
        ...state,
        games: sortedRat,
      };

    case SEARCH_BY_NAME:
      return {
        ...state,
        games: action.payload,
      };

    case POST_GAME:
      return {
        ...state,
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
