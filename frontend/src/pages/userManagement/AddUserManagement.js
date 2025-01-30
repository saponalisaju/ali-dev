import React, { useState } from "react";
import Common from "../../layouts/Common";
import { useDispatch, useSelector } from "react-redux";
import { addUserManagement } from "./userManagementSlice";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/main.css";

const AddUserManagement = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { users } = useSelector((state) => state.userManagement);
  const numberOfUser = users.length;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      id: numberOfUser + 1,
      name,
      email,
      password,
    };

    const userExists = users.some((u) => u.email === user.email);
    if (userExists) {
      setError("User already exists. Please try another...");
      return;
    }

    if (name.length < 3 || name.length > 31) {
      setError("User name must be between 3 and 31 characters long.");
      return;
    }

    try {
      dispatch(addUserManagement(user));
      navigate("/userManagement", { replace: true });
    } catch (error) {
      console.error("Error handling form submission:", error);
    }
  };

  return (
    <>
      <Common />
      <main className="add_user">
        <h2 className="visa_form">Create New User</h2>
        <hr className="user_manage_hr" />

        <form onSubmit={handleSubmit}>
          <div className="name_input">
            <label htmlFor="name" className="form-label">
              Name*
            </label>
            <input
              className="form-control p-2 mb-3"
              type="text"
              name="name"
              placeholder="Enter user name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="email_input">
            <label htmlFor="email" className="form-label">
              Email*
            </label>
            <input
              className="form-control p-2 mb-3"
              type="email"
              id="email"
              name="email"
              placeholder="Enter user email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              required
            />
          </div>

          <div className="password_input">
            <label htmlFor="password" className="form-label">
              Password*
            </label>
            <input
              className="form-control p-2 mb-3"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div style={{ color: "red" }}>{error}</div>}
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
        {}
      </main>
    </>
  );
};

export default AddUserManagement;
