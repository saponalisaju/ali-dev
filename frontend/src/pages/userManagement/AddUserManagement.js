import React, { useState } from "react";
import Common from "../../layouts/Common";
import { useDispatch, useSelector } from "react-redux";
import { addUserManagement } from "./userManagementSlice";
import { useNavigate } from "react-router-dom";

const AddUserManagement = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const numberOfUser = useSelector(
    (state) => state.userManagement.users.length
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      id: numberOfUser + 1,
      name,
      email,
      password,
    };
    dispatch(addUserManagement(user));
    navigate("/userManagement", { replace: true });
  };

  return (
    <>
      <Common />
      <main className="me-5">
        <h2>Create New User</h2>
        <hr />
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
              onChange={(e) => setEmail(e.target.value)}
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
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </main>
    </>
  );
};

export default AddUserManagement;
