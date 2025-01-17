import React, { useEffect } from "react";
import Common from "../../layouts/Common";
import { useDispatch, useSelector } from "react-redux";
import "../../assets/styles/main.css";
import { Link } from "react-router-dom";
import { deleteApplication, fetchApplication } from "./applicationSlice";

const UserView = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.applications);

  useEffect(() => {
    dispatch(fetchApplication());
  }, [dispatch]);

  const rejectUser = (id) => {
    if (typeof id === "string" && id.length === 24) {
      dispatch(deleteApplication(id));
    } else {
      console.error("Invalid ID format:", id);
    }
  };

  if (!users) {
    return <div>Loading...</div>;
  }

  return (
    <React.Fragment>
      <Common />
      <main
        data-bs-spy="scroll"
        data-bs-target="#example2"
        data-bs-offset="0"
        className=" me-5"
        tabIndex="0"
        style={{ overflowY: "scroll", maxHeight: "80vh" }}
      >
        <div className="">
          <h2 className="m-2">Applicants Copy(Approved)</h2>
          <ul className="align-item-left">
            {users.map((user) => {
              const { _id, image, surname } = user;
              let correctedPath = image.replace(/\\/g, "/");
              let imagePath = `http://localhost:4001/${correctedPath}`;
              console.log(imagePath);
              return (
                <li className=" " key={_id}>
                  <div className="text-bg-light d-flex">
                    <div className="d-flex">
                      <img
                        className="application_img"
                        src={imagePath}
                        alt="Applicant"
                      />
                    </div>
                    <div className=" d-grid theme_description">
                      <h3 className="ms-3 image_heading text-center">
                        {surname}
                      </h3>
                      <Link to="/editApplication">
                        <button className="btn btn-primary  btn_approved">
                          Approve
                        </button>
                      </Link>
                      <button
                        className="btn btn-danger   btn_approved"
                        onClick={() => rejectUser(_id)}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <table className="table table-bordered">
          <tbody>
            {users.map((user) => {
              const {
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
              } = user;

              return (
                <React.Fragment key={user.id}>
                  <h3 className="fst-italic text-black fw-bold text-center text-bg-light ">
                    {surname}
                  </h3>
                  <tr>
                    <th className="bg-primary">A. Personal Particulars</th>
                  </tr>
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
                          <td>Sex</td>
                          <td colSpan="2">{sex}</td>
                          <td>Date of Birth</td>
                          <td colSpan="2">{dob}</td>
                        </tr>
                        <tr>
                          <td>Place of Birth Town/City</td>
                          <td colSpan="2">{birthCity}</td>
                          <td>Visible Identification Marks</td>
                          <td colSpan="2">{identification}</td>
                        </tr>
                        <tr>
                          <td>Current Nationality</td>
                          <td colSpan="2">{currentN}</td>
                          <td>National ID No</td>
                          <td colSpan="2">{nationalId}</td>
                          <td colSpan="2"></td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                  <tr>
                    <th className="bg-primary">B. Company Details</th>
                  </tr>
                  <table className="table table-bordered mb-0">
                    <tbody>
                      <tr>
                        <td>Company Name</td>
                        <td colSpan="2">{company}</td>
                        <td>Job Title</td>
                        <td colSpan="2">{jobTitle}</td>
                      </tr>
                      <tr>
                        <td>Duty Duration</td>
                        <td colSpan="2">{dutyDuration}</td>
                        <td>Salary</td>
                        <td colSpan="2">{salary}</td>
                      </tr>
                    </tbody>
                  </table>

                  <tr>
                    <th className="bg-primary">C. Passport Details</th>
                  </tr>

                  <table className="table table-bordered mb-0">
                    <tbody>
                      <tr>
                        <td>Passport No</td>
                        <td>{passport}</td>
                        <td>Issued Country</td>
                        <td>{issuedCountry}</td>
                      </tr>
                    </tbody>
                  </table>

                  <tr>
                    <th className="bg-primary">
                      D. Applicant's Contact Details
                    </th>
                  </tr>

                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <td>Phone</td>
                        <td>{phone}</td>
                        <td>Email</td>
                        <td>{email}</td>
                      </tr>
                    </tbody>
                  </table>
                </React.Fragment>
              );
            })}
            ;
          </tbody>
        </table>
      </main>{" "}
    </React.Fragment>
  );
};

export default UserView;
