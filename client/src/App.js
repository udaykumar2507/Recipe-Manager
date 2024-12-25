import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RecipeList from "./components/RecipeList";
import RecipeForm from "./components/RecipeForm";
import Auth from "./components/Auth";
import Navbar from "./components/NavBar";
import './App.css';

const App = () => {
  // A helper component to conditionally render the Navbar
  const ConditionalNavbar = () => {
    const location = useLocation();
    const hideNavbarPaths = ["/"]; // Add paths where Navbar should be hidden
    return !hideNavbarPaths.includes(location.pathname) ? <Navbar /> : null;
  };

  return (
    <Router>
      <ConditionalNavbar />
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/recipes" element={<RecipeList />} />
        <Route path="/add-recipe" element={<RecipeForm />} />
      </Routes>
      <ToastContainer position="top-center" />
    </Router>
  );
};

export default App;
