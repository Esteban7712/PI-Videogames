import { Link } from "react-router-dom";
import styled from "styled-components"
import styles from "./Card.module.css"
//import { addCharacter, deleteCharacter } from "../redux/actions.js"
//import { connect } from "react-redux";
//import { useState, useEffect } from "react";
//import { useDispatch, useSelector } from "react-redux";

const Imagenes = styled.img`
  border-radius: 10px;
  width: 350px;
  height: 200px;
`;
const Carta = styled.div`
  display: inline-table;
  margin: 5px;
  border: 1px solid white;
  border-radius: 10px;
  color: white;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 30 px;
  width: 350px;
`;



export function Card(props) {
  //console.log(props)
   
   return (
     <Carta>
       {/* <div className={styles.buttonContainer}>
         <button onClick={() => props.onClose(props.id)}>X</button>
       </div> */}
       <Link to={`/detail/${props.id}`}>
         <Imagenes img src={props.background_image} alt="Img not found" />
       </Link>
       <h2>{props.name}</h2>
       <h4 className={styles.textContainer}>
         {props.genres.map((genre) => {
           return " - " + genre.name + " - ";
         })}
       </h4>
     </Carta>
   );
}


export default Card;
