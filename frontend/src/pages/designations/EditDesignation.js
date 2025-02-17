import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Common from "../../layouts/Common";
import "../../assets/styles/main.css";
import api from "./api";

const EditDesignation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (location.state) {
      setId(location.state._id);
      setName(location.state.name);
    } else {
      navigate("/designation");
    }
  }, [location.state, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.length < 3 || name.length > 31) {
      setError("Designation name must be between 3 and 31 characters long.");
      return;
    }

    try {
      const response = await api.put(`/editDesignation/${id}`, { name });
      if (response.status === 200) {
        navigate("/designation", { replace: true });
      } else {
        setError("Failed to update designation.");
      }
    } catch (error) {
      console.error("Error updating designation:", error);
      setError("Error updating designation. Please try again.");
    }
  };

  return (
    <>
      <Common />
      <main className="user_manage">
        <h2>Create New Designation</h2>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label className="form-label" htmlFor="name">
              Designation Name*
            </label>
            <input
              className="form-control p-2 mb-5"
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          {error && <div style={{ color: "red" }}>{error}</div>}
          <button className="btn btn-primary" type="submit">
            Update
          </button>
        </form>
      </main>
    </>
  );
};

export default EditDesignation;
