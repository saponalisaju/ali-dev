import React, { useEffect, useState } from "react";
import "../assets/styles/main.css";
import axios from "axios";
import apiUrl from "../secret";
import PrintButtonView from "./applications/FileOne";
import PrintButtonView1 from "./applications/FIleTwo";
import PrintButtonView2 from "./applications/FileThree";
import PrintButtonView3 from "./applications/FileFour";
import PrintButtonView4 from "./applications/FileFive";
import PrintButtonView5 from "./applications/FileSix";

import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import "./auth.css";
import enq from "../assets/images/download.jpeg";

const VisaEnquiry = () => {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [search1, setSearch1] = useState("");
  const [search2, setSearch2] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/application/fetchApplicationEnquiry`,
          {
            params: { limit: 10, search, search1, search2 },
          }
        );
        console.log("hello", response);
        setApplications(response.data.applications);
      } catch (error) {
        if (error.response) {
          console.error("Error headers:", error.response.headers);
          setError("Error response:", error.response.data);
        } else if (error.request) {
          console.error("Error request:", error.request);
          setError("Error request:", error.request);
        } else {
          console.error("Error message:", error.message);
          setError("Error message:", error.message);
        }
      }
      setLoading(false);
    };
    if (search !== "" && search1 !== "" && search2 !== "") {
      fetchData();
    }
  }, [search, search1, search2]);

  return (
    <>
      <div className="p-3">
        <Nav className="navbar bg-light p-4 ">
          <img className="enquiry_image" src={enq} alt="visa-logo" />
          <NavLink className="text-decoration-none">Visa Enquiry</NavLink>
          <NavLink to="/login" type="submit" className="btn btn-success">
            Login
          </NavLink>
        </Nav>
        <form className="p-4 form-control">
          <div className="d-flex p-1">
            <h3>Check Visa Status</h3>
          </div>
          <hr />
          <h5>Please Enter The Following Data</h5>
          <div className="form-control p-3">
            <label className="form-label" htmlFor="passport">
              Passport Number:
            </label>
            <input
              className="form-control mb-3"
              value={search}
              type="text"
              name="passportNumber"
              id="passport"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Passport Number"
            />

            <label className="form-label" htmlFor="nation">
              Nationality:
            </label>
            <input
              className="form-control mb-3"
              value={search1}
              onChange={(e) => setSearch1(e.target.value)}
              type="text"
              name="country"
              id="country"
              placeholder="Nationality"
            />

            <label className="form-label" htmlFor="dob">
              Date of Birth:
            </label>
            <input
              className="form-control mb-3"
              value={search2}
              onChange={(e) => setSearch2(e.target.value)}
              type="date"
              name="dateOfBirth"
              id="dob"
            />

            <button
              type="submit"
              className="btn btn-success me-1"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
            <button type="reset" className="btn btn-danger">
              Clear
            </button>
          </div>
          {error && <p className="text-danger">{error}</p>}
        </form>
      </div>
      <div className="p-3">
        {applications.map((user) => {
          const {
            _id,
            image,
            file,
            file1,
            file2,
            file3,
            file4,
            file5,
            surname,
            givenN,
            sex,
            birthCity,
            currentN,
            dob,
            identification,
            nationalId,
            company,
            dutyDuration,
            jobTitle,
            salary,
            passport,
            issuedCountry,
            phone,
            email,

            isStatus,
          } = user;
          return (
            <React.Fragment key={_id}>
              <div className="visa_query">
                <h2 className="m-2 view_one_head">
                  Applicants Copy({isStatus})
                </h2>

                <div className="text-bg-light ">
                  <div className="d-flex me-auto">
                    <img
                      className="application_img p-2"
                      src={`${apiUrl}/uploads/applicationImages/${image}`}
                      alt="Applicant"
                    />
                  </div>
                  <table className="table table-bordered">
                    <tbody className="t_body">
                      <tr>
                        <th className="fst-italic text-black fw-bold text-center text-bg-light ">
                          {surname}
                        </th>
                      </tr>
                      <tr>
                        <th className="bg-primary">A. Personal Particulars</th>
                      </tr>
                      <tr>
                        <td colSpan="3">
                          <table className="table table-bordered mb-0">
                            <tbody>
                              <tr>
                                <td>Surname</td>
                                <td>{surname}</td>
                              </tr>
                              <tr>
                                <td>Given Name</td>
                                <td>{givenN}</td>
                              </tr>
                              <tr>
                                <td className="dob">Sex</td>
                                <td colSpan="2">{sex}</td>
                                <td className="dob">Date of Birth</td>
                                <td colSpan="2">{dob}</td>
                              </tr>
                              <tr className="sex_dob">
                                <td>Place of Birth Town/City</td>
                                <td colSpan="2">{birthCity}</td>
                                <td>Visible Identification Marks</td>
                                <td colSpan="2">{identification}</td>
                              </tr>
                              <tr className="sex_dob">
                                <td>Current Nationality</td>
                                <td colSpan="2">{currentN}</td>
                                <td>National ID No</td>
                                <td colSpan="2">{nationalId}</td>
                                <td colSpan="2"></td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <th className="bg-primary">B. Company Details</th>
                      </tr>
                      <tr>
                        <td colSpan="3">
                          <table className="table table-bordered mb-0">
                            <tbody>
                              <tr className="sex_dob">
                                <td>Company Name</td>
                                <td colSpan="2">{company}</td>
                                <td>Job Title</td>
                                <td colSpan="2">{jobTitle}</td>
                              </tr>
                              <tr className="sex_dob">
                                <td>Duty Duration</td>
                                <td colSpan="2">{dutyDuration}</td>
                                <td>Salary</td>
                                <td colSpan="2">{salary}</td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <th className="bg-primary">C. Passport Details</th>
                      </tr>
                      <tr>
                        <td colSpan="3">
                          <table className="table table-bordered mb-0">
                            <tbody>
                              <tr className="sex_dob">
                                <td>Passport No</td>
                                <td>{passport}</td>
                                <td>Issued Country</td>
                                <td>{issuedCountry}</td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <th className="bg-primary">
                          D. Applicant's Contact Details
                        </th>
                      </tr>
                      <tr>
                        <td colSpan="3">
                          <table className="table table-bordered">
                            <tbody>
                              <tr className="sex_dob">
                                <td>Phone</td>
                                <td>{phone}</td>
                                <td>Email</td>
                                <td>{email}</td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className=" me-auto p-3">
                  <div className="pb-4">
                    <h5 className="p-2">Job Letters</h5>

                    <PrintButtonView apiUrl={apiUrl} file={file} />
                  </div>
                  <div className="pb-4">
                    <h5 className="p-2">Lmias</h5>
                    <PrintButtonView1 apiUrl={apiUrl} file1={file1} />
                  </div>
                  <div className="pb-4">
                    <h5 className="p-2">Visa</h5>
                    <PrintButtonView2 apiUrl={apiUrl} file2={file2} />
                  </div>
                  <div className="pb-4">
                    <h5 className="p-2">Visa Form</h5>
                    <PrintButtonView3 apiUrl={apiUrl} file3={file3} />
                  </div>
                  <div className="pb-4">
                    <h5 className="p-2">Work Permits</h5>
                    <PrintButtonView4 apiUrl={apiUrl} file4={file4} />
                  </div>
                  <div className="pb-4">
                    <h5 className="p-2" setApplications>
                      Air tickets
                    </h5>
                    <PrintButtonView5 apiUrl={apiUrl} file5={file5} />
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
        <p className="footer_area text-bg-dark p-4 text-center">
          &copy; 2024 Job Visa All Rights Reserved.
        </p>
      </div>
    </>
  );
};

export default VisaEnquiry;
