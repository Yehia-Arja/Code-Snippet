import React from "react";
import { NavLink } from "react-router-dom";
import useNavBarLogic from "./useNavBarLogic";
import { Link } from "react-router-dom";
import "./styles.css";

const NavBar = ({ searchValue, onSearchChange }) => {
  const { logout } = useNavBarLogic();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="./src/assets/Logo.png" alt="Logo" className="navbar-logo" />
        <div className="navbar-search">
          <input
            type="text"
            placeholder="TypeSearch..."
            value={searchValue}
            onChange={onSearchChange}
          />
        </div>
        <Link to="/add-code" className="add-snippet">+</Link>
      </div>
      <div className="navbar-right">
        <NavLink to="/home" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}>Home</NavLink>
        <NavLink to="/favorites" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}>Favorites</NavLink>
        <NavLink to="/my-cards" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}>MyCards</NavLink>
        <button onClick={logout} className="navbar-logout">Logout</button>
      </div>
    </nav>
  );
};

export default NavBar;
