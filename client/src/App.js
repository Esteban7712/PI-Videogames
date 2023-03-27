import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Form from "./components/Form/Form.jsx";
import Nav from "./components/Nav/Nav.jsx";
import Cards from "./components/Cards/Cards.jsx";
import Error from "./components/Error/Error.jsx";
import Detail from "./components/Detail/Detail.jsx";
import About from "./components/About/About.jsx";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const username = "esteban@mail.com"; //cambiar al env
  const password = "hear1234";

  const [access, setAccess] = useState(false);

  const [games, setGames] = useState([]);

  //acceso a la home con user y pass
  function login(userData) {
    if (userData.password === password && userData.username === username) {
      setAccess(true);
      navigate("/home");
    }
  }

  //busqueda de juegos
  const onSearch = (name) => {
    fetch(`http://localhost:3001/videogames/?name=${name}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const result = data
        // eslint-disable-next-line array-callback-return
        const filteredGames = result.filter((item) => {
          if (item.name.toLowerCase().includes(name.toLowerCase())) return item;
          
        });
        console.log(filteredGames);
        if (filteredGames.length) {
          setGames((oldgames) => [...oldgames, filteredGames]);
        } else {
          window.alert("No Game Found");
        }
      });
  };

  //eliminar tarjeta
  const onClose = (id) => {
    setGames(games.filter((game) => game.id !== id));
  };

  useEffect(() => {
    !access && navigate("/");
  }, [access]);

  return (
    <div className="App">
      {location.pathname !== "/" && <Nav onSearch={onSearch} />}
      <Routes>
        <Route exact path="/" element={<Form login={login} />} />
        <Route
          path="/home"
          element={<Cards games={games} onClose={onClose} />}
        />
        <Route path="/detail/:detailId" element={<Detail />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
