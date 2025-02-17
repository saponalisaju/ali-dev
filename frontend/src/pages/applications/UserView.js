import React, { useEffect, useState } from "react";
import Common from "../../layouts/Common";
import "../../assets/styles/main.css";
import { useLocation, useNavigate, Link } from "react-router-dom";

import api from "./api";

const UserView = () => {
  const [error, setError] = useState("");
  const [id, setId] = useState(" ");
  const [selectedFiles, setSelectedFiles] = useState({
    file: null,
    file1: null,
    file2: null,
    file3: null,
    file4: null,
    file5: null,
  });
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
    image: null,
    passport: " ",
    issuedCountry: " ",
  });

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

  const handleChange = (event) => {
    const { name, files } = event.target;
    setSelectedFiles((prevState) => ({
      ...prevState,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(selectedFiles).forEach((key) => {
      data.append(key, selectedFiles[key]);
    });

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await api.put(`/updateApplicationAdd/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
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

  const handleApprove = async (id) => {
    try {
      const response = await api.put(`/updateApplicationApprove/${id}`);
      if (response.status === 200) {
        navigate("/userView", { replace: true });
      } else {
        setError(
          `Failed to approve application. Server responded with status: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Error approving application:", error);
      setError(
        `Error approving application: ${
          error.response ? error.response.data.message : error.message
        }. Please try again.`
      );
    }
  };

  const handlePending = async (id) => {
    try {
      const response = await api.put(`/updateApplicationPending/${id}`);
      if (response.status === 200) {
        navigate("/userView", { replace: true });
      } else {
        setError(
          `Failed to pending application. Server responded with status: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Error pending application:", error);
      setError(
        `Error pending application: ${
          error.response ? error.response.data.message : error.message
        }. Please try again.`
      );
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await api.put(`/updateApplicationReject/${id}`);
      if (response.status === 200) {
        navigate("/userView", { replace: true });
      } else {
        setError(
          `Failed to reject application. Server responded with status: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Error rejecting application:", error);
      setError(
        `Error rejecting application: ${
          error.response ? error.response.data.message : error.message
        }. Please try again.`
      );
    }
  };

  return (
    <>
      <React.Fragment>
        <Common />

        <main
          data-bs-spy="scroll"
          data-bs-target="#example2"
          data-bs-offset="0"
          className="me-5 user_manage "
          tabIndex="0"
          style={{ overflowY: "scroll", maxHeight: "80vh" }}
        >
          <h2 className="m-2">Applicants Copy({formData.isStatus})</h2>

          <div className="text-bg-light ">
            <div className="d-flex me-auto">
              <img
                className="application_img p-2"
                src={`/public/application/${formData.image}`}
                alt="Applicant"
              />
            </div>
            <div className="border border-2 view_one mb-3">
              <h2 className="fst-italic text-black fw-bold text-center text-bg-light ">
                {formData.surname}
              </h2>

              <div>
                <h4 className="bg-secondary p-2">A. Personal Particulars</h4>
              </div>
              <div className="surname_given">
                <div className="d-flex surname_head_one">
                  <strong className="border surname_one">Surname</strong>
                  <span className="border surname_result_one">
                    {formData.surname}
                  </span>
                </div>
                <div className="d-flex">
                  <strong className="border surname_one">Given Name</strong>
                  <span className="border surname_result_one">
                    {formData.givenN}
                  </span>
                </div>
                <div className="d-flex sex_birth">
                  <div className="d-flex surname_head">
                    <strong className="border surname_sex_one">Sex</strong>
                    <span className="border surname_sex">{formData.sex}</span>
                  </div>
                  <div className="d-flex surname_head">
                    <strong className="border surname_sex_one">
                      Date of Birth
                    </strong>
                    <span className="border surname_sex">{formData.dob}</span>
                  </div>
                </div>
                <div className="d-flex sex_birth">
                  <div className="d-flex surname_head">
                    <strong className="border surname_sex">
                      Place of Birth Town/City
                    </strong>
                    <span className="border surname_sex">
                      {formData.birthCity}
                    </span>
                  </div>
                  <div className="d-flex surname_head">
                    <strong className="border surname_sex">
                      Visible Identification Marks
                    </strong>
                    <span className="border surname_sex">
                      {formData.identification}
                    </span>
                  </div>
                </div>
                <div className="d-flex sex_birth">
                  <div className="d-flex surname_head">
                    <strong className="border surname_sex_one">
                      Current Nationality
                    </strong>
                    <span className="border surname_sex">
                      {formData.currentN}
                    </span>
                  </div>
                  <div className="d-flex surname_head">
                    <strong className="border surname_sex_one">
                      National ID No
                    </strong>
                    <span className="border surname_sex">
                      {formData.nationalId}
                    </span>
                  </div>
                </div>
              </div>

              <h4 className="bg-secondary p-2">B. Company Details</h4>

              <div className="d-flex sex_birth">
                <div className="d-flex surname_head">
                  <strong className="border surname_sex_one">
                    Company Name
                  </strong>
                  <span className="border surname_sex">{formData.company}</span>
                </div>
                <div className="d-flex surname_head">
                  <strong className="border surname_sex_one">Job Title</strong>
                  <span className="border surname_sex">
                    {formData.jobTitle}
                  </span>
                </div>
              </div>
              <div className="d-flex sex_birth">
                <div className="d-flex surname_head">
                  <strong className="border surname_sex">Duty Duration</strong>
                  <span className="border surname_sex">
                    {formData.dutyDuration}
                  </span>
                </div>
                <div className="d-flex surname_head">
                  <strong className="border surname_sex">Salary</strong>
                  <span className="border surname_sex">{formData.salary}</span>
                </div>
              </div>

              <h4 className="bg-secondary p-2">C. Passport Details</h4>

              <div className="d-flex sex_birth">
                <div className="d-flex surname_head">
                  <strong className="border surname_sex_one">
                    Passport No
                  </strong>
                  <span className="border surname_sex">
                    {formData.passport}
                  </span>
                </div>
                <div className="d-flex surname_head">
                  <strong className="border surname_sex_one">
                    Issued Country
                  </strong>
                  <span className="border surname_sex">
                    {formData.issuedCountry}
                  </span>
                </div>
              </div>

              <h4 className="bg-secondary p-2">
                D. Applicant's Contact Details
              </h4>

              <div className="d-flex sex_birth">
                <div className="d-flex surname_head">
                  <strong className="border surname_sex_one">Phone</strong>
                  <span className="border surname_sex">{formData.phone}</span>
                </div>
                <div className="d-flex surname_head">
                  <strong className="border surname_sex_one">Email</strong>
                  <span className="border surname_sex">{formData.email}</span>
                </div>
              </div>
            </div>
            <div className="upload_head pb-2">
              <div className="file_upload ">
                <form
                  onSubmit={handleSubmit}
                  className="form-control "
                  encType="multipart/form-data"
                >
                  <div className=" pb-4">
                    <h4 className="fw-bold">JOB LETTERS</h4>
                    <div className="d-flex pb-3  ">
                      <input
                        className="form-control ms-auto"
                        type="file"
                        name="file"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="w-100">
                      <img
                        className="view_image"
                        src={`/public/job_letter/${formData.file}`}
                        alt="Attachment"
                      />
                    </div>
                  </div>
                  <div className=" pb-4">
                    <h4 className="fw-bold">LMIAS</h4>
                    <div className="d-flex pb-3  ">
                      <input
                        className="form-control ms-auto"
                        type="file"
                        name="file1"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="w-100">
                      <img
                        className="view_image"
                        src={`/public/lmia/${formData.file1}`}
                        alt="Attachment"
                      />
                    </div>
                  </div>
                  <div className="pb-4 ">
                    <h4 className="fw-bold">VISA</h4>
                    <div className="d-flex pb-3  ">
                      <input
                        className="form-control ms-auto"
                        type="file"
                        name="file2"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="w-100">
                      <img
                        className="view_image"
                        src={`/public/visa/${formData.file2}`}
                        alt="Attachment"
                      />
                    </div>
                  </div>
                  <div className="pb-4 ">
                    <h4 className="fw-bold">VISA FORM</h4>
                    <div className="d-flex pb-3  ">
                      <input
                        className="form-control ms-auto"
                        type="file"
                        name="file3"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="w-100">
                      <img
                        className="view_image"
                        src={`/public/visa_form/${formData.file3}`}
                        alt="Attachment"
                      />
                    </div>
                  </div>
                  <div className=" pb-4">
                    <h4 className="fw-bold">WORK PERMITS</h4>
                    <div className="d-flex pb-3  ">
                      <input
                        className="form-control ms-auto"
                        type="file"
                        name="file4"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="w-100">
                      <img
                        className="view_image"
                        src={`/public/work_permit/${formData.file4}`}
                        alt="Attachment"
                      />
                    </div>
                  </div>
                  <div className=" pb-4 w-100">
                    <h4 className="fw-bold">AIR TICKETS</h4>
                    <div className="d-flex pb-3  ">
                      <input
                        className="form-control ms-auto"
                        type="file"
                        name="file5"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="w-100">
                      <img
                        className="view_image"
                        src={`/public/air_ticket/${formData.file5}`}
                        alt="Attachment"
                      />
                    </div>
                  </div>
                  <button
                    className="btn btn-secondary btn-sm ms-auto"
                    type="submit"
                  >
                    Upload
                  </button>
                </form>
              </div>
            </div>
            <div className="justify-content-end d-flex theme_description ">
              <Link
                onClick={() => handlePending(id)}
                className="btn btn-secondary btn_approved"
              >
                Pending
              </Link>
              <Link
                className="btn btn-primary btn_approved"
                onClick={() => handleApprove(id)}
              >
                Approve
              </Link>
              <Link
                className="btn btn-danger btn_approved"
                onClick={() => handleReject(id)}
              >
                Reject
              </Link>
            </div>
            {error && <div style={{ color: "red" }}>{error}</div>}
          </div>
        </main>
      </React.Fragment>
    </>
  );
};

export default UserView;
