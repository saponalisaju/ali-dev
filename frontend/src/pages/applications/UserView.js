import React, { useEffect, useState } from "react";
import Common from "../../layouts/Common";
import "../../assets/styles/main.css";
import { useLocation, useNavigate, Link } from "react-router-dom";
import PrintButton from "./PrintButton";
import api from "./api";
import apiUrl from "../../secret";
import PrintButton1 from "./PrintButton1";
import PrintButton2 from "./PrintButton2";
import PrintButton5 from "./PrintButton5";
import PrintButton4 from "./PrintButton4";
import PrintButton3 from "./PrintButton3";

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
                src={`${apiUrl}/uploads/applicationImages/${formData.image}`}
                alt="Applicant"
              />
            </div>
            <table className="table table-bordered ">
              <tbody>
                <tr>
                  <th className="text-uppercase text-center text-success fw-bold fs-3 text-bg-light ">
                    {formData.surname}
                  </th>
                </tr>
                <tr>
                  <th className="bg-secondary">A. Personal Particulars</th>
                </tr>
                <tr>
                  <td colSpan="3">
                    <table className="table table-bordered mb-0">
                      <tbody>
                        <tr>
                          <td>Surname</td>
                          <td>{formData.surname}</td>
                        </tr>
                        <tr>
                          <td>Given Name</td>
                          <td>{formData.givenN}</td>
                        </tr>
                        <tr>
                          <td>Sex</td>
                          <td colSpan="2">{formData.sex}</td>
                          <td>Date of Birth</td>
                          <td colSpan="2">{formData.dob}</td>
                        </tr>
                        <tr>
                          <td>Place of Birth Town/City</td>
                          <td colSpan="2">{formData.birthCity}</td>
                          <td>Visible Identification Marks</td>
                          <td colSpan="2">{formData.identification}</td>
                        </tr>
                        <tr>
                          <td>Current Nationality</td>
                          <td colSpan="2">{formData.currentN}</td>
                          <td>National ID No</td>
                          <td colSpan="2">{formData.nationalId}</td>
                          <td colSpan="2"></td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <th className="bg-secondary">B. Company Details</th>
                </tr>
                <tr>
                  <td colSpan="3">
                    <table className="table table-bordered mb-0">
                      <tbody>
                        <tr>
                          <td>Company Name</td>
                          <td colSpan="2">{formData.company}</td>
                          <td>Job Title</td>
                          <td colSpan="2">{formData.jobTitle}</td>
                        </tr>
                        <tr>
                          <td>Duty Duration</td>
                          <td colSpan="2">{formData.dutyDuration}</td>
                          <td>Salary</td>
                          <td colSpan="2">{formData.salary}</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <th className="bg-secondary">C. Passport Details</th>
                </tr>
                <tr>
                  <td colSpan="3">
                    <table className="table table-bordered mb-0">
                      <tbody>
                        <tr>
                          <td>Passport No</td>
                          <td>{formData.passport}</td>
                          <td>Issued Country</td>
                          <td>{formData.issuedCountry}</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <th className="bg-secondary">
                    D. Applicant's Contact Details
                  </th>
                </tr>
                <tr>
                  <td colSpan="3">
                    <table className="table table-bordered">
                      <tbody>
                        <tr>
                          <td>Phone</td>
                          <td>{formData.phone}</td>
                          <td>Email</td>
                          <td>{formData.email}</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="upload_head pb-2">
              <div className="file_upload m-3 ">
                <form
                  onSubmit={handleSubmit}
                  className="form-control "
                  encType="multipart/form-data"
                >
                  <div className=" pb-4">
                    <h4 className="fw-bold">JOB LETTERS</h4>
                    <div className="d-flex pb-3  ">
                      <input
                        id="file"
                        className="form-control ms-auto"
                        type="file"
                        name="file"
                        onChange={handleChange}
                      />
                      <button
                        className="btn btn-secondary btn-sm ms-auto"
                        type="submit"
                      >
                        Upload
                      </button>
                    </div>
                    <PrintButton apiUrl={apiUrl} formData={formData} />
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
                      <button
                        className="btn btn-secondary btn-sm ms-auto"
                        type="submit"
                      >
                        Upload
                      </button>
                    </div>
                    <PrintButton1 apiUrl={apiUrl} formData={formData} />
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
                      <button
                        className="btn btn-secondary btn-sm ms-auto"
                        type="submit"
                      >
                        Upload
                      </button>
                    </div>
                    <PrintButton2 apiUrl={apiUrl} formData={formData} />
                  </div>
                  <div className="pb-4 ">
                    <h4 className="fw-bold">VISA FORM</h4>
                    <div className="d-flex pb-3  ">
                      <input
                        id="file"
                        className="form-control ms-auto"
                        type="file"
                        name="file3"
                        onChange={handleChange}
                      />
                      <button
                        className="btn btn-secondary btn-sm ms-auto"
                        type="submit"
                      >
                        Upload
                      </button>
                    </div>
                    <PrintButton3 apiUrl={apiUrl} formData={formData} />
                  </div>
                  <div className=" pb-4">
                    <h4 className="fw-bold">WORK PERMITS</h4>
                    <div className="d-flex pb-3  ">
                      <input
                        id="file"
                        className="form-control ms-auto"
                        type="file"
                        name="file4"
                        onChange={handleChange}
                      />
                      <button
                        className="btn btn-secondary btn-sm ms-auto"
                        type="submit"
                      >
                        Upload
                      </button>
                    </div>
                    <PrintButton4 apiUrl={apiUrl} formData={formData} />
                  </div>
                  <div className=" pb-4">
                    <h4 className="fw-bold">AIR TICKETS</h4>
                    <div className="d-flex pb-3  ">
                      <input
                        id="file"
                        className="form-control ms-auto"
                        type="file"
                        name="file5"
                        onChange={handleChange}
                      />
                      <button
                        className="btn btn-secondary btn-sm ms-auto"
                        type="submit"
                      >
                        Upload
                      </button>
                    </div>
                    <PrintButton5 apiUrl={apiUrl} formData={formData} />
                  </div>
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
