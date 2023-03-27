import { Link } from "react-router-dom";
import styled from "styled-components"
import styles from "./Card.module.css"
//import { addCharacter, deleteCharacter } from "../redux/actions.js"
//import { connect } from "react-redux";
//import { useState, useEffect } from "react";
//import { useDispatch, useSelector } from "react-redux";

const Imagenes = styled.img`
  border-radius: 50px;
  width: 350px;
`;
const Carta = styled.div`
   
   display: inline-table;
   margin: 5px; 
   border: 1px solid white;
   border-radius: 10px;
   background-color: #64DD17;
   padding: 30 px;
   width: 350px;
`



export function Card(props) {
  console.log(props)
   
   return (
     <Carta>
       <div className={styles.buttonContainer}>
         <button onClick={() => props.onClose(props.id)}>X</button>
       </div>
        <Link to={`/detail/${props.id}`}>
       <h1>{props.name}</h1>
        </Link>
       <h2>Released: {props.released}</h2>
       <h2>Rating: {props.rating}</h2>
       <Imagenes img src={props.background_image} alt="Img not found" />
     </Carta>
   );
}


export default Card;
