import { useState } from "react";
import validation from "./validation.js";
import style from "./FormCreate.module.css";
import axios from "axios"

export default function FormCreate() {
  const [form, setForm] = useState({
    name: "",
    platforms: [],
    description: "",
    released: "",
    rating: "",
    genres: [],
  });

  const [error, setError] = useState({
    name: "",
    platforms: [],
    description: "",
    released: "",
    rating: "",
    genres: [],
  });

  const changeHandler = (e) => {
    const property = e.target.name;
    const value = e.target.value;
    setForm({ ...form, [property]: value }); //agregamos la info escrita por los inputs
    setError(
      validation({
        ...form,
        [e.target.name]: e.target.value, //validamos que la info de los inputs llegue correcta
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !error.name &&
      !error.platforms &&
      !error.description &&
      !error.released &&
      !error.rating
    ) {
      axios
        .post("http://localhost:3001/videogames/new", form)
        .then((res) => alert(res))
        .catch((err) => alert(err));
    }
  }

  return (
    <form className={style.container} onSubmit={handleSubmit}>
      <div>
        <label>Name: </label>
        <input
          name="name"
          type="text"
          value={form.name}
          placeholder="Name"
          onChange={changeHandler}
        />
        <span>{error.name}</span>
      </div>
      <div>
        <label>Platforms: </label>
        <input
          name="platforms"
          type="text"
          value={form.platforms}
          placeholder="Platforms"
          onChange={changeHandler}
        />
      </div>
      <span>{error.platforms}</span>
      <div>
        <label>Description: </label>
        <input
          name="description"
          type="text"
          value={form.description}
          placeholder="Description"
          onChange={changeHandler}
        />
      </div>
      <span>{error.description}</span>
      <div>
        <label>Released: </label>
        <input
          name="released"
          type="date"
          value={form.released}
          placeholder="Released"
          onChange={changeHandler}
        />
      </div>
      <span>{error.released}</span>
      <div>
        <label>Rating: </label>
        <input
          name="rating"
          type="text"
          value={form.rating}
          placeholder="Rating"
          onChange={changeHandler}
        />
      </div>
      <span>{error.rating}</span>
      <button type="submit">Create</button>
    </form>
  );
}
