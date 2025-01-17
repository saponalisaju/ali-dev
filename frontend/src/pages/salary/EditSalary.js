import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { updateSalary } from "./salarySlice";
import Common from "../../layouts/Common";
import "../../assets/styles/main.css";

const EditDesignation = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [_id, setId] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (location.state) {
      setId(location.state._id);
      setName(location.state.name);
    } else {
      // Redirect to a safe page if state is null
      navigate("/designation");
    }
  }, [location.state, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateSalary({ _id, name }));
    navigate("/salary");
  };

  return (
    <>
      <Common />
      <main className="me-5">
        <h2>Create New Salary</h2>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label className="form-label" htmlFor="name">
              Salary Name*
            </label>
            <input
              className="form-control p-2 mb-3"
              type="number"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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

export default EditDesignation;
