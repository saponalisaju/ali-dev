import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import apiUrl from "../secret";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); // New state for error message

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("All fields are required");
      console.error("Missing input data");
      return;
    }
    setIsLoading(true);
    setError(""); // Clear previous error message
    const formData = { name, email, password };
    try {
      const response = await axios.post(
        `${apiUrl}/api/users/register`,
        formData,
        { headers: { "Content-Type": "application/json" }, timeout: 5000 }
      );

      console.log("Registration successful:", response.data);
      navigate("/login");
    } catch (error) {
      setIsLoading(false);
      if (error.response) {
        console.error(
          "Server responded with an error:",
          error.response.status,
          error.response.data
        );
        setError(`Error: User all ready exists. Please sign in.`); //${error.response.data.message}
      } else if (error.request) {
        console.error("No response received:", error.request);
        setError("No response from server. Please try again.");
      } else {
        console.error("Error setting up the request:", error.message);
        setError("An error occurred during registration. Please try again.");
      }
    }
  };

  return (
    <div className="register">
      <div className="register-form">
        <h2 className="text-center">Register</h2>
        <form className="form-control" onSubmit={handleRegister}>
          <div className="form-field">
            <label className="form-label" htmlFor="name">
              Name*
            </label>
            <input
              className="form-control p-1 mb-1"
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="email">
              Email*
            </label>
            <input
              className="form-control p-1 mb-1"
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="password">
              Password*
            </label>
            <input
              className="form-control p-1 mb-1"
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="button-wrapper">
            <button
              className="btn btn-outline-secondary btn-sm"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Sign Up"}
            </button>
          </div>
        </form>
        {error && <div className="error-message">{error}</div>}
        <div className="fs-6 text-center text-muted">
          Have an account?
          <a className="fst-italic text-decoration-none" href="/login">
            &nbsp;Sign In
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
