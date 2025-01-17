import React, { useState } from "react";
import Common from "../../layouts/Common";
import { useDispatch, useSelector } from "react-redux";
import { addDesignation } from "./DesignationSlice";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/main.css";

const AddDesignation = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const numberOfUser = useSelector((state) => state.designations.users.length);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { id: numberOfUser + 1, name };
    dispatch(addDesignation(user));
    navigate("/designation", { replace: true });
  };

  return (
    <>
      <Common />
      <main>
        <h2>Create New Designation</h2>
        <hr />
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
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </main>
    </>
  );
};

export default AddDesignation;
