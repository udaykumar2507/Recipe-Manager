import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [form, setForm] = useState({ email: "", password: "", username: "" });
  const [isRegister, setIsRegister] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isRegister
      ? "http://localhost:5000/auth/register"
      : "http://localhost:5000/auth/login";

    try {
      const response = await axios.post(url, form);

      // Store the token and username in local storage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username); // Assuming the API sends username in the response

      toast.success(isRegister ? "User registered successfully!" : "Login successful!");

      // Navigate to the Recipe page after login
      if (!isRegister) {
        navigate("/recipes");
      }
    } catch (err) {
      toast.error(err.response?.data || "An error occurred");
    }
  };

  return (
    <div className="container auth-container">
      <h1>{isRegister ? "Register" : "Login"}</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        {isRegister && (
          <>
            <label>Username:</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
            />
          </>
        )}
        <label>Email:</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit">{isRegister ? "Register" : "Login"}</button>
      </form>
      <button className="toggle-btn" onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "Switch to Login" : "Switch to Register"}
      </button>
    </div>
  );
};

export default Auth;
