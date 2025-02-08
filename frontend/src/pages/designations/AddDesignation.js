import "../../assets/styles/main.css";
import { useState } from "react";
import Common from "../../layouts/Common";
import { useNavigate } from "react-router-dom";
import api from "./api";

const AddDesignation = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.length < 3 || name.length > 31) {
      setError("Designation name must be between 3 and 31 characters long.");
      return;
    }

    try {
      const response = await api.post(`/addDesignation`, { name });
      if (response.status === 201) {
        navigate("/designation", { replace: true });
      } else {
        setError("Failed to add designation.");
      }
    } catch (error) {
      console.error("Error adding designation:", error);
      setError("Error adding designation. Please try again.");
    }
  };

  return (
    <>
      <Common />
      <main className="add_user">
        <h2 className="visa_form">Create New Designation</h2>
        <hr className="user_manage_hr" />
        <form onSubmit={handleSubmit}>
          <label className="form-label">Designation Name*</label>
          <input
            className="form-control p-2 mb-3"
            type="text"
            placeholder="Enter designation name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {error && <div style={{ color: "red" }}>{error}</div>}
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </main>
    </>
  );
};

export default AddDesignation;
