import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Form from "./components/Form/Form.jsx";
import Nav from "./components/Nav/Nav.jsx";
//import Cards from "./components/Cards/Cards.jsx";
import Error from "./components/Error/Error.jsx";
import Detail from "./components/Detail/Detail.jsx";
import About from "./components/About/About.jsx";
import FormCreate from "./components/Form_Create/FormCreate.jsx";
import Home from "./components/Home/Home.jsx"

const USER = process.env.REACT_APP_LOGIN_USER; 
const PASS = process.env.REACT_APP_LOGIN_PASS;

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const username = USER; 
  const password = PASS;
 

  const [access, setAccess] = useState(false);

 

  //acceso a la home con user y pass
  function login(userData) {
    if (userData.password === password && userData.username === username) {
      setAccess(true);
      navigate("/home");
    }
  }

  useEffect(() => {//cuando el usuario y la clave son correctas nos redirige al home
    !access && navigate("/");
  }, [access, navigate]);

  //////////////////////////////////////////////////////////////

  return (//se generan las rutas en el front
    <div className="App">
      {location.pathname !== "/" && <Nav />}
      <Routes>
        <Route exact path="/" element={<Form login={login} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<FormCreate />} />
        <Route path="/detail/:detailId" element={<Detail />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
