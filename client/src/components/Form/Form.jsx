import React from "react";
import validation from "./validation.js";
import styles from "./Form.module.css";

const USER = process.env.REACT_APP_LOGIN_USER; 
const PASS = process.env.REACT_APP_LOGIN_PASS;

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

  const [guestData, setGuestData] = React.useState({
        username: USER,
        password: PASS
  })
  
  const guestEnter = () => {
      props.login(guestData)
    }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>VIDEOGAMES</h1>
      </div>
      <div className={styles.loginBox}>
        <h1 className={styles.boxTitle}>HENRY - PI</h1>
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
        <div className={styles.loginBox2}>
          
          <button className={styles.submit2} onClick={guestEnter}>
            Guest
          </button>
        
        </div>
      </div>
    </div>
  );
}