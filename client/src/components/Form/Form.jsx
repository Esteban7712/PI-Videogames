import React from "react";
import validation from "./validation.js";
import styles from "./Form.module.css";



export default function Form(props) {

    const [userData, setUserData] = React.useState({
        username: "",
        password: ""
    })

    const [error, setErrors] = React.useState({
        username: "",
        password: ""
    })

    const handleInputChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
        setErrors(
            validation({
            ...userData,
            [e.target.name]: e.target.value
            })
        )    
    }

    const handleSubmit = (e) => { 
    e.preventDefault();
    props.login(userData)
  }

  return (
    <div className={styles.container}>
      <div><h1>Hola Mundo</h1></div>
      <div className={styles.loginBox}>
        <h1 className={styles.logTitle}>Videogames</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleInputChange}
            className={error.username && styles.warning}
          />
          <p className="danger">{error.username}</p>
          <label htmlFor="password">Password:</label>
          <input
            type="password" //colocar type="current-password" para que no se autocomplete
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            className={error.password && styles.warning}
          />
          <p className="danger">{error.password}</p>
          <button className={styles.submit} type="submit">
            Start
          </button>
        </form>
      </div>
    </div>
  );
}