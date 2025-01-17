import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "../assets/styles/main.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `https://travel-app-mern.onrender.com/api/users/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "Access-Control-Allow-Headers",
          },
          timeout: 10000,
        }
      );
      console.log("User logged in successfully");
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error.response || error.message || error);
      setError("Login failed. Please check your email and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register">
      <Toaster />
      <div className="register-form">
        <h2 className="text-center mb-3">World Job Visa</h2>
        <form className="form-control" onSubmit={handleLogin}>
          {error && <div className="alert alert-danger">{error}</div>}
          <div>
            <label htmlFor="email">Email:</label>
            <input
              className="form-control p-2 mb-3"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              className="form-control p-2 mb-3"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="fs-6 text-center text-muted">
          Admin not registered ?
          <a className="fst-italic text-decoration-none" href="/register">
            &nbsp;Click here
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
