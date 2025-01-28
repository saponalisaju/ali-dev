import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { updateUserManagement } from "./userManagementSlice";
import Common from "../../layouts/Common";
import "../../assets/styles/main.css";

const EditUserManagement = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [_id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (location.state) {
      setId(location.state._id);
      setName(location.state.name);
      setEmail(location.state.email);
    } else {
      navigate("/userManagement");
    }
  }, [location.state, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserManagement({ _id, name, email }));
    navigate("/userManagement");
  };

  return (
    <>
      <Common />
      <main className="user_manage">
        <h2>Create New User</h2>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              className="form-control p-2 mb-3"
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              className="form-control p-2 mb-3"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Update
          </button>
        </form>
      </main>
    </>
  );
};

export default EditUserManagement;
