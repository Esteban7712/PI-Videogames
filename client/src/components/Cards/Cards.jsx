import  Card  from '../Card/Card.jsx';
import React from 'react';
import { useSelector} from "react-redux"

export default function Cards(props) {
   /* const { games } = props;
   console.log(games) */
  
  const games = useSelector(state => state.games)
  
   return (
     <div>
       {games.map((game) => (
         <Card
           key={game.name}
           name={game.name}
           released={game.released}
           rating={game.rating}
           background_image={game.background_image}
           id={game.id}
           platforms={game.platforms}
           genres={game.genres}
           description={game.description}
           onClose={props.onClose}
         />
       ))}
     </div>
   );
}
