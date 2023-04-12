import React from "react";
import SearchBar from "../SearchBar/SearchBar.jsx";
import style from "./Nav.module.css"
import { Link } from "react-router-dom";


export default function Nav() {
    return (
      <div className={style.container}>
        <Link className={style.create} to={"/create"}>
          Create Game
        </Link>
        <Link className={style.about} to={"/about"}>
          About
        </Link>
        <SearchBar className={style.bar} />
        <Link className={style.home} to={"/home"}>
          Home
        </Link>
        <Link className={style.logout} to={"/"}>
          Logout
        </Link>
      </div>
    );
}
