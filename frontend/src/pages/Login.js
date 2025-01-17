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
          timeout: 3000,
        }
      );
      // function setCookie(name, value, days) {
      //   let expires = "";
      //   if (days) {
      //     let date = new Date();
      //     date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      //     expires = "; expires=" + date.toUTCString();
      //   }
      //   document.cookie = name + "=" + (value || "") + expires + "; path=/";
      // }
      // Store the token in local storage
      console.log("User logged in successfully");
      // console.log(response);
      // setCookie("accessToken", response.data.accessToken, 1);
      // setCookie("refreshToken", response.data.refreshToken, 2);
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
