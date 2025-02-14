import React from "react";
import Common from "../../layouts/Common";
import "../../assets/styles/main.css";
import apiUrl from "../../secret";
import { useLocation } from "react-router-dom";

import PrintButtonView from "./FileOne";
import PrintButtonView1 from "./FIleTwo";
import PrintButtonView2 from "./FileThree";
import PrintButtonView3 from "./FileFour";
import PrintButtonView4 from "./FileFive";
import PrintButtonView5 from "./FileSix";

const ViewOne = () => {
  const location = useLocation();
  const { application } = location.state || {};

  if (!application) {
    return <div>No application data found.</div>;
  }

  return (
    <React.Fragment>
      <Common />
      <main
        data-bs-spy="scroll"
        data-bs-target="#example2"
        data-bs-offset="0"
        className="me-5 user_manage border border-3"
        tabIndex="0"
        style={{ overflowY: "scroll", maxHeight: "80vh" }}
      >
        <div className="">
          <h2 className="m-2 view_one_head">
            Applicants Copy({application.isStatus})
          </h2>
          <ul className="align-item-left">
            <li className=" " key={application._id}>
              <div className="text-bg-light ">
                <div className="d-flex me-auto">
                  <img
                    className="application_img p-2"
                    src={`${apiUrl}/uploads/applicationImages/${application.image}`}
                    alt="Applicant"
                  />
                </div>
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <th className="fst-italic text-black fw-bold text-center text-bg-light ">
                        {application.surname}
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
                              <td>{application.surname}</td>
                            </tr>
                            <tr>
                              <td>Given Name</td>
                              <td>{application.givenN}</td>
                            </tr>
                            <tr>
                              <td>Sex</td>
                              <td colSpan="2">{application.sex}</td>
                              <td>Date of Birth</td>
                              <td colSpan="2">{application.dob}</td>
                            </tr>
                            <tr>
                              <td>Place of Birth Town/City</td>
                              <td colSpan="2">{application.birthCity}</td>
                              <td>Visible Identification Marks</td>
                              <td colSpan="2">{application.identification}</td>
                            </tr>
                            <tr>
                              <td>Current Nationality</td>
                              <td colSpan="2">{application.currentN}</td>
                              <td>National ID No</td>
                              <td colSpan="2">{application.nationalId}</td>
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
                            <tr>
                              <td>Company Name</td>
                              <td colSpan="2">{application.company}</td>
                              <td>Job Title</td>
                              <td colSpan="2">{application.jobTitle}</td>
                            </tr>
                            <tr>
                              <td>Duty Duration</td>
                              <td colSpan="2">{application.dutyDuration}</td>
                              <td>Salary</td>
                              <td colSpan="2">{application.salary}</td>
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
                            <tr>
                              <td>Passport No</td>
                              <td>{application.passport}</td>
                              <td>Issued Country</td>
                              <td>{application.issuedCountry}</td>
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
                            <tr>
                              <td>Phone</td>
                              <td>{application.phone}</td>
                              <td>Email</td>
                              <td>{application.email}</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </li>
          </ul>
          <div className=" me-auto p-3">
            <div className="pb-4">
              <h5>Job Letters</h5>
              <PrintButtonView apiUrl={apiUrl} application={application} />
            </div>
            <div className="pb-4">
              <h5>Lmias</h5>
              <PrintButtonView1 apiUrl={apiUrl} application={application} />
            </div>
            <div className="pb-4">
              <h5>Visa</h5>
              <PrintButtonView2 apiUrl={apiUrl} application={application} />
            </div>
            <div className="pb-4">
              <h5>Visa Form</h5>
              <PrintButtonView3 apiUrl={apiUrl} application={application} />
            </div>
            <div className="pb-4">
              <h5>Work Permits</h5>
              <PrintButtonView4 apiUrl={apiUrl} application={application} />
            </div>
            <div className="pb-4">
              <h5>Air tickets</h5>
              <PrintButtonView5 apiUrl={apiUrl} application={application} />
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default ViewOne;
