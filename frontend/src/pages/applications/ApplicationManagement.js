import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Common from "../../layouts/Common";
import { useDispatch, useSelector } from "react-redux";
import { fetchApplication, deleteApplication } from "./applicationSlice";
import "../../assets/styles/main.css";

const ApplicationManagement = () => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.applications);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchApplication());
    }
  }, [status, dispatch]);

  const deleteHandler = (id) => {
    if (typeof id === "string" && id.length === 24) {
      dispatch(deleteApplication(id));
    } else {
      console.error("Invalid ID format:", id);
    }
  };

  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const currentDate = `${day}-${month}-${year}`;
  const nextCurrentDate = `${day + 2}-${month}-${year}`;

  return (
    <>
      <div className="example2">
        <Common />
      </div>
      <main
        data-bs-spy="scroll"
        data-bs-target="#example2"
        data-bs-offset="0"
        className=" me-5"
        tabIndex="0"
        style={{ overflowY: "scroll", maxHeight: "80vh" }}
      >
        <div className="heading-management p-2 d-flex">
          <h2 className=" me-auto">Application Management</h2>
          <Link to="/addUserApplication">
            <button className="btn btn-primary">Add New Application</button>
          </Link>
        </div>
        <hr />
        <div className="d-flex ">
          <div className="d-flex me-auto mb-3">
            <div className="">
              <label className="form-label" htmlFor="name"></label>
              <select className="form-select" id="name">
                <option>Sort by status</option>
                <option>All</option>
                <option>Pending</option>
                <option>Approved</option>
                <option>Rejected</option>
              </select>
            </div>
            <div>
              <label className="form-label" htmlFor="admin"></label>
              <select className="form-select" id="admin">
                <option>Sort by admin</option>
                <option>All</option>
                <option>Rakib</option>
              </select>
            </div>
          </div>
          <div className="search-bar border d-flex border rounded-2">
            <input
              className="input-search form-control "
              type="text"
              placeholder="Search by passport no..."
            />
            <button className="btn btn-light" type="submit">
              Search
            </button>
          </div>
        </div>
        <table className="table table-striped-column">
          <thead className="">
            <tr>
              <th scope="col" className="bg-light">
                NAME
              </th>
              <th scope="col" className="bg-light">
                ADMIN
              </th>
              <th scope="col" className="bg-light">
                PASSPORT NO
              </th>
              <th scope="col" className="bg-light">
                STATUS
              </th>
              <th scope="col" className="bg-light">
                VISA COLLECT DATE
              </th>
              <th scope="col" className="bg-light">
                VISA APPROVE DATE
              </th>
              <th scope="col" className="bg-light">
                ACTION
              </th>
              <th className="visually-hidden"> all</th>
            </tr>
          </thead>
          <tbody>
            {" "}
            {users &&
              users.map((user) => {
                const {
                  _id,
                  surname,
                  givenN,
                  email,
                  phone,
                  nationalId,
                  sex,
                  dob,
                  birthCity,
                  currentN,
                  identification,
                  company,
                  dutyDuration,
                  jobTitle,
                  salary,
                  passport,
                  issuedCountry,
                } = user;
                return (
                  <tr key={_id}>
                    <td>{surname}</td>
                    <td>Admin</td>
                    <td>{passport}</td>
                    <td>Pending</td>
                    <td>{currentDate}</td>
                    <td>{nextCurrentDate}</td>

                    <td>
                      <Link
                        to="/userView"
                        state={{
                          _id,
                          surname,
                          givenN,
                          email,
                          phone,
                          nationalId,
                          sex,
                          dob,
                          birthCity,
                          currentN,
                          identification,
                          company,
                          dutyDuration,
                          jobTitle,
                          salary,
                          passport,
                          issuedCountry,
                        }}
                      >
                        <button className="btn btn-white text-primary p-1">
                          View
                        </button>
                      </Link>
                      <Link
                        to="/editApplication"
                        state={{
                          _id,
                          surname,
                          givenN,
                          email,
                          phone,
                          nationalId,
                          sex,
                          dob,
                          birthCity,

                          currentN,
                          identification,
                          company,
                          dutyDuration,
                          jobTitle,
                          salary,
                          passport,
                          issuedCountry,
                        }}
                      >
                        <button className="btn btn-white text-primary p-1">
                          Edit
                        </button>
                      </Link>
                      <button
                        className="btn btn-white text-danger p-1"
                        onClick={() => {
                          deleteHandler(_id);
                        }}
                      >
                        Delete
                      </button>
                      <td className="visually-hidden">
                        <span>{givenN}</span>
                        <span>{email}</span>
                        <span>{phone}</span>
                        <span>{nationalId}</span>
                        <span>{sex}</span>
                        <span>{dob}</span>
                        <span>{birthCity}</span>
                        <span>{currentN}</span>
                        <span>{identification}</span>
                        <span>{company}</span>
                        <span>{dutyDuration}</span>
                        <span>{jobTitle}</span>
                        <span>{salary}</span>
                        <span>{issuedCountry}</span>
                      </td>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {status === "loading" && <div>Loading...</div>}{" "}
        {status === "failed" && <div>Error: {error}</div>}
      </main>
    </>
  );
};

export default ApplicationManagement;
