import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🍳 RecipeBook
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link
              to="/"
              className={`nav-link ${
                location.pathname === "/" ? "active" : ""
              }`}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/recipes"
              className={`nav-link ${
                location.pathname === "/recipes" ? "active" : ""
              }`}
            >
              All Recipes
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/categories"
              className={`nav-link ${
                location.pathname === "/categories" ? "active" : ""
              }`}
            >
              Categories
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/add-recipe"
              className={`nav-link ${
                location.pathname === "/add-recipe" ? "active" : ""
              }`}
            >
              Add Recipe
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
