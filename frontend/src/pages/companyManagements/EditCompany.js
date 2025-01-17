import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { updateCompany } from "./companySlice";
import Common from "../../layouts/Common";
import "../../assets/styles/main.css";

const EditCompany = () => {
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
      navigate("/company");
    }
  }, [location.state, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCompany({ _id, name }));
    navigate("/company");
  };

  return (
    <>
      <Common />
      <main>
        <h2>Create New Company</h2>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label className="form-label" htmlFor="name">
              Company Name*
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
          <button className="btn btn-primary" type="submit">
            Update
          </button>
        </form>
      </main>
    </>
  );
};

export default EditCompany;
