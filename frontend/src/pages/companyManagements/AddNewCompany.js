import React, { useState } from "react";
import Common from "../../layouts/Common";
import { useDispatch, useSelector } from "react-redux";
import { addCompany } from "./companySlice";
//import { addNewCompany } from "../../services/apiServices";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/main.css";

const AddNewCompany = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const numberOfUser = useSelector((state) => state.company.users.length);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { id: numberOfUser + 1, name };
    dispatch(addCompany(user));
    navigate("/company", { replace: true });
  };

  return (
    <>
      <Common />
      <main>
        <h2>Create New Company</h2>
        <hr />
        <form onSubmit={handleSubmit}>
          <label className="form-label" htmlFor="name">
            Company Name*
          </label>
          <input
            className="form-control p-2 mb-3"
            type="text"
            placeholder="Enter company name"
            name="name"
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

export default AddNewCompany;
