import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer.js";


const store = createStore(rootReducer, applyMiddleware(thunk));
//el thunk es una funcion intermedia que detiene las acciones hasta que las peticiones asincronas se realicen

export default store;