import { useState } from "react";
import styled from "styled-components";

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

export default function SearchBar(props) {

   const [game, setGame] = useState("")

   const handleChange = (e) => {
      const { value } = e.target;
      setGame(value);
   }

   return (
      <div>
         <input type='search' onChange={handleChange} placeholder="Search"/>

         <Boton onClick={() =>
            props.onSearch(game)}
         >Add</Boton>
      </div>
   );
}
