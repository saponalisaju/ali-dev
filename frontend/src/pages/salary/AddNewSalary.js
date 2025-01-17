import React, { useState } from "react";
import Common from "../../layouts/Common";
import { useDispatch, useSelector } from "react-redux";
import { addSalary } from "./salarySlice";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/main.css";

const AddNewSalary = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const numberOfUser = useSelector((state) => state.salary.users.length);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { id: numberOfUser + 1, name };
    dispatch(addSalary(user));
    navigate("/salary", { replace: true });
  };

  return (
    <>
      <Common />
      <main className="me-5">
        <h2>Create New Salary</h2>
        <hr />
        <form onSubmit={handleSubmit}>
          <div>
            <label className="form-label" htmlFor="salary">
              Salary Name*
            </label>
            <input
              className="form-control mb-3 p-2"
              type="text"
              placeholder="Enter salary name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </form>
      </main>
    </>
  );
};

export default AddNewSalary;
