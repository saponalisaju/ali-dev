import React, { useState } from "react";
import Common from "../../layouts/Common";
import { useDispatch, useSelector } from "react-redux";
import { addCompany } from "./companySlice";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/main.css";

const AddNewCompany = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const numberOfUser = useSelector((state) => state.company.users.length);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.length < 3 || name.length > 31) {
      setError("Company name must be between 3 and 31 characters long.");
      return;
    }
    const user = { id: numberOfUser + 1, name };
    try {
      dispatch(addCompany(user));
      navigate("/company", { replace: true });
    } catch (error) {
      console.error("Error handling form submission:", error);
    }
  };

  return (
    <>
      <Common />
      <main className="add_user">
        <h2 className="visa_form">Create New Company</h2>
        <hr className="user_manage_hr" />
        <form onSubmit={handleSubmit}>
          <label className="form-label" htmlFor="name">
            Company Name*
          </label>
          <input
            className="form-control p-2 mb-5"
            type="text"
            placeholder="Enter company name"
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
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

export default AddNewCompany;
