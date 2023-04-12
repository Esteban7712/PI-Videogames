import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { searchByName } from "../redux/actions";

const Boton = styled.button`
  display: inline-block;
  border-radius: 4px;
  background-color: #64DD17;
  border: none;
  color: #000;
  text-align: center;
  width: 90px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 5px;
   
`

export default function SearchBar() {

   const dispatch = useDispatch();
   const [game, setGame] = useState("")

   function handleChange(e) {//guardo el nombre del juego que me llega por input
      e.preventDefault();
      setGame(e.target.value);//seteo el estado con ese nombre
   }

   function handleSubmit(e) {//cuando pulse el boton de Add se despacha la accion para traer los juegos ya filtrados
      e.preventDefault();
      dispatch(searchByName(game))
      setGame("");
   }

   
   return (
     <div>
       <input
         type="text"
         onChange={(e) => handleChange(e)}
         placeholder="Search..."
       />

       <Boton type="submit" onClick={(e) => handleSubmit(e)}>
         Search
       </Boton>
     </div>
   );
}
