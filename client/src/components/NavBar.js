import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import "./Navbar.css";

const Navbar = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate(); // Initialize navigate for redirection

  // Retrieve stored username from localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    // Remove username and token from localStorage
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    // Redirect to login page
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <Link to="/recipes" className="navbar__logo">
          RecipeManager
        </Link>
      </div>
      <div className="navbar__center">
        <Link to="/recipes" className="navbar__link">
          Recipe List
        </Link>
        <Link to="/add-recipe" className="navbar__link">
          Add Recipe
        </Link>
      </div>
      <div className="navbar__right">
        <div className="navbar__profile">
          <span className="navbar__username">{username || "Guest"}</span>
        </div>
        {/* Add logout button */}
        <button onClick={handleLogout} className="navbar__logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
