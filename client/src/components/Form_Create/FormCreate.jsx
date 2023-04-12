import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getGenres, getPlatforms, postGame } from "../redux/actions.js";
import validation from "./validation.js";
import style from "./FormCreate.module.css";

export default function FormCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); //me traigo este hook para redigirime al home cuando finalice la creacion
  const genres = useSelector((state) => state.genres); // me traigo todos los generos
  const platforms = useSelector((state) => state.platforms); //me traigo todas las plataformas

  const [genreValidate, setGenreValidate] = useState([]); //estado validador para que no se repita el genero
  const [platValidate, setPlatValidate] = useState([]); //estado validador para que no se repita la plataforma

  const [form, setForm] = useState({
    //creo un estado para guardar todo lo que llega por inputs
    name: "",
    description: "",
    platforms: [],
    background_image: "",
    released: "",
    rating: "",
    genres: [],
  });

  const [error, setError] = useState({
    //creo un estado para validar si ocurren errores en los inputs
    name: "",
    description: "",
    platforms: [],
    background_image: "",
    released: "",
    rating: "",
    genres: [],
  });

  useEffect(() => {
    //al montar el componente despacho las acciones que cargan los estados de generos y plataformas
    dispatch(getGenres());
    dispatch(getPlatforms());
  }, [dispatch]);

  const changeHandler = (e) => {
    //recibo la info de los inputs para guardarla en los estados
    const property = e.target.name; //esta es la propiedad que quiero modificar
    const value = e.target.value; //este es el valor que me va a llegar por input
    setForm({ ...form, [property]: value }); //agregamos la info escrita por los inputs
    setError(
      validation({
        ...form,
        [e.target.name]: e.target.value, //validamos que la info de los inputs llegue correcta
      })
    );
  };

  const handleGenreSelect = (e) => {
    const genreOption = e.target.value; //guardo el genero que me llega por input
    const validateG = genreValidate.includes(genreOption); //valido si ese genero ya esta en el array validador
    if (!validateG) {

      setGenreValidate([...genreValidate, genreOption]);//seteo el array validador si la opcion no esta aun
      
      setForm({
        ...form,
        genres: [...form.genres, genreOption],
      });
  
    }
  };

  const handlePlatformSelect = (e) => {
    const platOption = e.target.value; //guardo la plataforma que me llega por input
    const validateP = platValidate.includes(platOption); //valido si esa plataforma ya esta en el array validador
    if (!validateP) {

      setPlatValidate([...platValidate, platOption]);//seteo el array validador si la opcion no esta aun
     
      setForm({
        ...form,
        platforms: [...form.platforms, platOption],
      });
    };
  };

  /* const handleGenresDelete = (e) => {
    setForm({
      ...form,
      genres: form.genres.filter((d) => d !== e),
    });
  }   */

  const handleSubmit = (e) => {
    //valido si hay algun error en los inputs antes de que se envie la info
    e.preventDefault();
    //console.log(form)
    if (
      error.name &&
      error.background_image &&
      error.description &&
      error.released &&
      error.rating
    ) {
      alert("Validate Fields");
    } else {
      dispatch(postGame(form)); //envio al reducer para que haga el posteo en la bd
      alert("¡Game Created Succesfully!"); //aviso que la creacion fue exitosa
      setForm({
        //vuelvo a setear el estado a vacio
        name: "",
        description: "",
        platforms: [],
        background_image: "",
        released: "",
        rating: "",
        genres: [],
      });
      navigate("/home"); //Me redirige al home al finalizar
    }
  };

  return (
    <div>
      <div className={style.title}>
        <h1>Create your Game</h1>
      </div>
      <form className={style.container} onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Name: </label>
          <input
            name="name"
            type="text"
            value={form.name}
            placeholder="Name"
            onChange={(e) => changeHandler(e)}
            onBlur={(e) => changeHandler(e)}
            className={style.inputs}
          />
          <br></br>
          <span className={style.danger}>{error.name}</span>
        </div>

        <div>
          <label>Imagen: </label>
          <input
            name="background_image"
            type="text"
            value={form.background_image}
            placeholder="Image URL"
            onChange={(e) => changeHandler(e)}
            className={style.inputs}
          />
        </div>
        <span className={style.danger}>{error.background_image}</span>

        <div>
          <label>Released: </label>
          <input
            name="released"
            type="date"
            value={form.released}
            placeholder="Released"
            onChange={(e) => changeHandler(e)}
            className={style.inputs}
          />
        </div>
        <span className={style.danger}>{error.released}</span>

        <div>
          <label>Rating: </label>
          <input
            name="rating"
            type="number"
            value={form.rating}
            placeholder="Rating"
            onChange={(e) => changeHandler(e)}
            className={style.inputs}
          />
        </div>
        <span className={style.danger}>{error.rating}</span>

        <div className={style.plat}>
          <label>Platforms: </label>
          <select onChange={(e) => handlePlatformSelect(e)}>
            {platforms
              .sort()
              .map(
                (
                  platform /* mapeo cada uno de las plataformas para que aparezcan en el checkbox */
                ) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                )
              )}
          </select>
          <br></br>
          <span className={style.danger}>{error.platforms}</span>
          <ul>
            <li>
              {form.platforms.map(
                (
                  platform /* aqui muestro las plataformas que haya marcado en el select*/
                ) => "-" + platform + "-"
              )}
            </li>
          </ul>
        </div>

        <div>
          <label>Genres: </label>
          <select onChange={(e) => handleGenreSelect(e)}>
            {genres
              .sort()
              .map(
                (
                  genre /* mapeo cada uno de los generos para que aparezcan en el select */
                ) => (
                  <option key={genre.name} value={genre.name}>
                    {genre.name}
                  </option>
                )
              )}
          </select>
          <br></br>
          <span className={style.danger}>{error.genres}</span>
          <ul>
            <li>
              {form.genres.map(
                (
                  genre /* aqui muestro los generos que haya marcado en el select*/
                ) => "-" + genre + "-"
              )}
            </li>
          </ul>
        </div>

        <div>
          <label className={style.descriptLab}>Description: </label>
          <textarea
            name="description"
            type="text"
            value={form.description}
            placeholder="Description"
            onChange={(e) => changeHandler(e)}
            className={style.descript}
          />
        </div>
        <span className={style.danger}>{error.description}</span>

        <button className={style.button} type="submit">
          Create
        </button>
      </form>
    </div>
  );
}
