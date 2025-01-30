import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Common from "../../layouts/Common";
import { useDispatch, useSelector } from "react-redux";
import { fetchApplication, deleteApplication } from "./applicationSlice";
import "../../assets/styles/main.css";

const ApplicationManagement = () => {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const dispatch = useDispatch();
  const { users, status } = useSelector((state) => state.applications);

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

  useEffect(() => {
    if (users) {
      setFilteredData(users);
    }
  }, [users]);

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
    const searchRegExp = new RegExp(".*" + searchValue + ".*", "i");
    const filtered = users.filter((item) => searchRegExp.test(item.passportNo));
    setFilteredData(filtered);
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
        className="user_manage"
        tabIndex="0"
        style={{ overflowY: "scroll", maxHeight: "80vh" }}
      >
        <div className="user_manage_head d-flex">
          <h2 className="user_manage_app me-auto ">Application Management</h2>
          <Link className="btn btn-primary " to="/addUserApplication">
            Add New Application
          </Link>
        </div>
        <hr />
        <div className="d-flex ">
          <div className="search_option d-flex ">
            <div className="sort_by d-flex gap-2">
              <div className="application_fetch">
                <label className="form-label" htmlFor="name"></label>
                <select className="form-select" id="name">
                  <option>Sort by status</option>
                  <option>All</option>
                  <option>Pending</option>
                  <option>Approved</option>
                  <option>Rejected</option>
                </select>
              </div>
              <div className=" ">
                <label className="form-label" htmlFor="admin"></label>
                <select className="form-select" id="admin">
                  <option>Sort by admin</option>
                  <option>All</option>
                  <option>Rakib</option>
                </select>
              </div>
            </div>
            <div className="search-bar">
              <input
                className="input-search form-control "
                id="search"
                type="text"
                placeholder="Search by passport no..."
                value={search}
                onChange={handleSearch}
              />
              <ul>
                {filteredData.map((item, index) => (
                  <li key={index}>{item.passportNo}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <table className="table table-striped-column app_table table-bordered">
          <thead>
            <tr className="tApp_head">
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
              <th className="visually-hidden">all</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((user) => {
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
                <React.Fragment key={_id}>
                  <tr className="tApp_head">
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
                        onClick={() => deleteHandler(_id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                  <tr className="visually-hidden">
                    <td>{givenN}</td>
                    <td>{email}</td>
                    <td>{phone}</td>
                    <td>{nationalId}</td>
                    <td>{sex}</td>
                    <td>{dob}</td>
                    <td>{birthCity}</td>
                    <td>{currentN}</td>
                    <td>{identification}</td>
                    <td>{company}</td>
                    <td>{dutyDuration}</td>
                    <td>{jobTitle}</td>
                    <td>{salary}</td>
                    <td>{issuedCountry}</td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </main>
    </>
  );
};

export default ApplicationManagement;
