import React, { useEffect, useState } from "react";
import Common from "../../layouts/Common";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/main.css";
import api from "./api";

const AddUserApplication = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    surname: "",
    givenN: "",
    email: "",
    phone: "",
    nationalId: "",
    sex: "",
    dob: "",
    birthCity: "",
    currentN: "",
    identification: "",
    company: "",
    dutyDuration: "",
    jobTitle: "",
    salary: "",
    image: null,
    passport: "",
    issuedCountry: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get(`/fetchApplication`);
        setApplications(response.data.applications);
        console.log(response);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const onChangeHandler = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const selectedFile = files[0];
      const maxSize = 2 * 1024 * 1024; // 2 MB
      if (selectedFile && selectedFile.size > maxSize) {
        setError("File size exceeds the limit of 2 MB.");
        setFormData((prevData) => ({ ...prevData, image: null }));
      } else {
        setError("");
        setFormData((prevData) => ({ ...prevData, image: selectedFile }));
      }
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { surname, givenN, email, image, passport, ...rest } = formData;

    // Validate surname and given name length
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

    // Check if the user already exists
    const userExists = applications.some((u) => u.email === email);
    applications.some((u) => u.passport === passport);
    if (userExists) {
      setError("User already exists. Please try another...");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("surname", surname.trim());
      formDataToSend.append("givenN", givenN.trim());
      formDataToSend.append("email", email.trim());

      // Append the rest of the fields if they are not empty or null
      Object.keys(rest).forEach((key) => {
        if (formData[key] !== "" && formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        }
      });

      if (image) {
        formDataToSend.append("image", image);
      }

      const response = await api.post(`/addApplication`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 201) {
        navigate("/application", { replace: true });
        setError(""); // Clear error message on success
      } else {
        setError(
          `Failed to add application. Server responded with status: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Error adding application:", error);
      setError("Error adding application. Please try again.");
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
        className="scrollspy-example add_user me-5"
        tabIndex="0"
        style={{ overflowY: "scroll", maxHeight: "100vh" }}
      >
        <h2 className="visa_form">Visa Application Form</h2>
        <p className="particulars">Personal Particulars</p>
        <hr className="user_manage_hr " />
        <form
          onSubmit={handleSubmit}
          className="me-5 absolute"
          encType="multipart/form-data"
        >
          <div className="name-details d-flex">
            <div className="surname w-50 p-1">
              <label className="form-label" htmlFor="surname">
                Surname*
              </label>
              <input
                className="form-control p-2 mb-3"
                type="text"
                name="surname"
                required
                value={formData.surname}
                onChange={onChangeHandler}
              />
            </div>
            <div className="w-50 p-1">
              <label className="form-label" htmlFor="givenN">
                Given Name*
              </label>
              <input
                className="form-control p-2 mb-3"
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
            <div className="phone-no w-50 p-1">
              <label className="form-label" htmlFor="phone">
                Phone*
              </label>
              <input
                className="form-control p-2 mb-3"
                type="text"
                name="phone"
                required
                value={formData.phone}
                onChange={onChangeHandler}
              />
            </div>
            <div className="id-number w-50 p-1">
              <label className="form-label" htmlFor="nationalId">
                National ID*
              </label>
              <input
                className="form-control p-2 mb-3"
                type="text"
                name="nationalId"
                required
                value={formData.nationalId}
                onChange={onChangeHandler}
              />
            </div>
          </div>
          <div className="gender_date d-flex">
            <div className="gender w-50 p-1">
              <label className="form-label" htmlFor="sex">
                Sex*
              </label>
              <select
                id="sex"
                className="form-select p-2 mb-3"
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
            <div className="dob w-50 p-1">
              <label className="form-label" htmlFor="dob">
                Date of Birth*
              </label>
              <input
                className="form-control p-2 mb-3"
                type="date"
                name="dob"
                required
                value={formData.dob}
                onChange={onChangeHandler}
              />
            </div>
          </div>
          <div className="city_birth d-flex">
            <div className="w-50 p-1">
              <label className="form-label" htmlFor="birthCity">
                Place of Birth Town/City*
              </label>
              <input
                className="form-control p-2 mb-3"
                type="text"
                name="birthCity"
                required
                value={formData.birthCity}
                onChange={onChangeHandler}
              />
            </div>
            <div className="id-number w-50 p-1">
              <label className="form-label" htmlFor="currentN">
                Current Nationality*
              </label>
              <input
                className="form-control p-2 mb-3"
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
              className="form-control mb-3"
              required
              value={formData.identification}
              onChange={onChangeHandler}
            >
              Enter identification marks
            </textarea>
          </div>
          <div className="company_duration d-flex">
            <div className="phone-no w-50 p-1">
              <label className="form-label" htmlFor="company">
                Company Name*
              </label>
              <input
                className="form-control p-2 mb-3"
                type="text"
                name="company"
                required
                value={formData.company}
                onChange={onChangeHandler}
              />
            </div>
            <div className="id-number w-50 p-1">
              <label className="form-label" htmlFor="dutyDuration">
                Duty Duration*
              </label>
              <input
                className="form-control p-2 mb-3"
                type="text"
                name="dutyDuration"
                required
                value={formData.dutyDuration}
                onChange={onChangeHandler}
              />
            </div>
          </div>
          <div className="d-flex job_title">
            <div className="w-50 p-1">
              <label className="form-label" htmlFor="jobTitle">
                Job Title*
              </label>
              <select
                id="jobTitle"
                name="jobTitle"
                className="form-select p-2 mb-3"
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
            <div className="id-number w-50 p-1">
              <label className="form-label" htmlFor="salary">
                Salary*
              </label>
              <input
                className="form-control p-2 mb-3"
                type="text"
                name="salary"
                required
                value={formData.salary}
                onChange={onChangeHandler}
              />
            </div>
          </div>
          <div className="edit-file">
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
          </div>
          <div className="id-number p-1">
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
          <div>
            <label className="form-label" htmlFor="issuedCountry">
              Issued Country
            </label>
            <input
              className="form-control p-2 mb-3"
              type="text"
              name="issuedCountry"
              required
              placeholder="Enter issued country"
              value={formData.issuedCountry}
              onChange={onChangeHandler}
            />
            {error && <span style={{ color: "red" }}>{error}</span>}
          </div>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </main>
    </>
  );
};

export default AddUserApplication;
