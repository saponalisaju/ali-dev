import "../../assets/styles/main.css";
import { useState } from "react";
import Common from "../../layouts/Common";
import { useDispatch, useSelector } from "react-redux";
import { addDesignation } from "./DesignationSlice";
import { useNavigate } from "react-router-dom";

const AddDesignation = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users } = useSelector((state) => state.designations);
  const numberOfUser = users.length;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.length < 3 || name.length > 31) {
      setError("Designation name must be between 3 and 31 characters long.");
      return;
    }
    const user = { id: numberOfUser + 1, name };
    dispatch(addDesignation(user));
    navigate("/designation", { replace: true });
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
