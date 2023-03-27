import React from "react";
import SearchBar from "../SearchBar/SearchBar.jsx";
import style from "./Nav.module.css"
import { Link } from "react-router-dom";


export default function Nav({onSearch}) {
    return (
      <div className={style.container}>
        <SearchBar onSearch={onSearch} />
        <Link className={style.about} to={"/about"}>
          About
        </Link>
        <Link className={style.home} to={"/home"}>
          Home
        </Link>
        <Link className={style.logout} to={"/"}>
          Logout
        </Link>
      </div>
    );
}
