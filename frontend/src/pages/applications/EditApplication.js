import React, { useEffect, useState } from "react";
import Common from "../../layouts/Common";
import { useLocation, useNavigate } from "react-router-dom";
import "../../assets/styles/main.css";
import api from "./api";

const EditApplication = () => {
  const [error, setError] = useState("");
  const [id, setId] = useState(" ");
  const [formData, setFormData] = useState({
    surname: " ",
    givenN: " ",
    email: " ",
    phone: " ",
    nationalId: " ",
    sex: "",
    dob: " ",
    birthCity: " ",
    currentN: " ",
    identification: "",
    company: " ",
    dutyDuration: " ",
    jobTitle: " ",
    salary: " ",
    passport: " ",
    issuedCountry: " ",
  });

  const onChangeHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state) {
      setId(location.state._id);
      setFormData(location.state);
    } else {
      navigate("/application");
    }
  }, [location.state, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { surname, givenN } = formData;

    if (
      surname.trim().length < 3 ||
      surname.trim().length > 31 ||
      givenN.trim().length < 3 ||
      givenN.trim().length > 31
    ) {
      setError(
        "Surname and Given name must be between 3 and 31 characters long."
      );
      return;
    }
    try {
      const response = await api.put(`/updateApplication/${id}`, {
        ...formData,
        id,
      });
      if (response.status === 200) {
        navigate("/application", { replace: true });
      } else {
        setError("Failed to update application.");
      }
    } catch (error) {
      console.error("Error updating application:", error);
      setError("Error updating application. Please try again.");
    }
  };
  return (
    <>
      <div id="navbar-example2">
        <Common />
      </div>
      <main
        data-bs-spy="scroll"
        data-bs-target="#navbar-example2"
        data-bs-offset="0"
        className="scrollspy-example me-5 user_manage"
        tabIndex="0"
        style={{ overflowY: "scroll", maxHeight: "80vh" }}
      >
        <h2>Application Form</h2>
        <p>Personal Particulars</p>
        <hr className="user_manage_hr" />

        <form
          onSubmit={handleSubmit}
          className=""
          encType="multipart/form-data"
        >
          <div className="name-details d-flex">
            <div className="surname_edit ">
              <label className="form-label" htmlFor="surname">
                Surname*
              </label>
              <input
                className="form-control "
                type="text"
                name="surname"
                required
                value={formData.surname}
                onChange={onChangeHandler}
              />
            </div>
            <div className="surname_edit ms-1">
              <label className="form-label" htmlFor="givenN">
                Given Name*
              </label>
              <input
                className="form-control"
                type="text"
                name="givenN"
                required
                value={formData.givenN}
                onChange={onChangeHandler}
              />
            </div>
          </div>
          <div>
            <label className="form-label" htmlFor="email">
              Email*
            </label>
            <input
              className="form-control p-2 mb-3"
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={onChangeHandler}
            />
          </div>
          <div className="identification d-flex">
            <div className="phone-no surname_edit">
              <label className="form-label" htmlFor="phone">
                Phone*
              </label>
              <input
                className="form-control"
                type="text"
                name="phone"
                required
                value={formData.phone}
                onChange={onChangeHandler}
              />
            </div>
            <div className="id-number surname_edit ms-1">
              <label className="form-label" htmlFor="nationalId">
                National ID*
              </label>
              <input
                className="form-control "
                type="text"
                name="nationalId"
                required
                value={formData.nationalId}
                onChange={onChangeHandler}
              />
            </div>
          </div>
          <div className="birth_date d-flex">
            <div className=" surname_edit ms-1">
              <label className="form-label" htmlFor="sex">
                Sex*
              </label>
              <select
                className="form-select"
                name="sex"
                value={formData.sex}
                required
                onChange={onChangeHandler}
              >
                <option>Select Sex</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <div className=" surname_edit ms-1">
              <label className="form-label" htmlFor="dob">
                Date of Birth*
              </label>
              <input
                className="form-control "
                type="date"
                name="dob"
                required
                value={formData.dob}
                onChange={onChangeHandler}
              />
            </div>
          </div>
          <div className="birth_date d-flex">
            <div className="surname_edit ms-1">
              <label className="form-label" htmlFor="birthCity">
                Place of Birth Town/City*
              </label>
              <input
                className="form-control "
                type="text"
                name="birthCity"
                required
                value={formData.birthCity}
                onChange={onChangeHandler}
              />
            </div>
            <div className=" surname_edit ms-1">
              <label className="form-label" htmlFor="currentN">
                Current Nationality*
              </label>
              <input
                className="form-control"
                type="text"
                name="currentN"
                required
                placeholder="Enter current nationality"
                value={formData.currentN}
                onChange={onChangeHandler}
              />
            </div>
          </div>

          <div className="message">
            <label className="form-label" htmlFor="identification">
              Identification Marks*
            </label>
            <textarea
              id="identification"
              name="identification"
              className="form-control p-2 mb-3"
              required
              value={formData.identification}
              onChange={onChangeHandler}
            >
              Enter identification marks
            </textarea>
          </div>
          <div className="birth_date d-flex">
            <div className="surname_edit ">
              <label className="form-label" htmlFor="company">
                Company Name*
              </label>
              <input
                className="form-control "
                type="text"
                name="company"
                required
                value={formData.company}
                onChange={onChangeHandler}
              />
            </div>
            <div className="surname_edit ">
              <label className="form-label" htmlFor="dutyDuration">
                Duty Duration*
              </label>
              <input
                className="form-control "
                type="text"
                name="dutyDuration"
                required
                value={formData.dutyDuration}
                onChange={onChangeHandler}
              />
            </div>
          </div>
          <div className="birth_date d-flex">
            <div className="surname_edit">
              <label className="form-label" htmlFor="jobTitle">
                Job Title*
              </label>
              <select
                id="jobTitle"
                name="jobTitle"
                className="form-select "
                value={formData.jobTitle}
                onChange={onChangeHandler}
              >
                <option>Select Job Title</option>
                <option>Driving</option>
                <option>Construction</option>
                <option>Electrician</option>
                <option>Holder</option>
                <option>Housekeeping</option>
                <option>Cleaner</option>
                <option>Plumber</option>
                <option>Packaging</option>
                <option>Cook</option>
                <option>Restaurant</option>
                <option>Manager</option>
                <option>Supervisor</option>
                <option>Worker</option>
                <option>Caring Operator</option>
              </select>
            </div>
            <div className="surname_edit">
              <label className="form-label" htmlFor="salary">
                Salary*
              </label>
              <input
                className="form-control "
                type="text"
                name="salary"
                required
                value={formData.salary}
                onChange={onChangeHandler}
              />
            </div>
          </div>
          {/* <div className="edit-file">
                  <label className="form-label" htmlFor="image">
                    Image
                  </label>
                  <input
                    className="form-control p-2 mb-3"
                    type="file"
                    name="image"
                    accept="image/*"
                    required
                    onChange={onChangeHandler}
                  />
                </div> */}
          <div className="id-number  p-1">
            <label className="form-label" htmlFor="passport">
              Passport*
            </label>
            <input
              className="form-control p-2 mb-3"
              type="text"
              name="passport"
              required
              value={formData.passport}
              onChange={onChangeHandler}
            />
          </div>
          <div className="pb-2">
            <label className="form-label" htmlFor="issuedCountry">
              Issued Country
            </label>
            <input
              className="form-control p-2 mb-5"
              type="text"
              name="issuedCountry"
              required
              placeholder="Enter issued country"
              value={formData.issuedCountry}
              onChange={onChangeHandler}
            />
          </div>
          {error && <div style={{ color: "red" }}>{error}</div>}
          <button className="btn btn-primary mb-3" type="submit">
            Submit
          </button>
        </form>
      </main>
    </>
  );
};

export default EditApplication;
