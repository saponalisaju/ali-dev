import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Common from "../../layouts/Common";
import "../../assets/styles/main.css";
import api from "./api";

const ApplicationManagement = () => {
  const [applications, setApplications] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/fetchApplication`, {
          params: { page, limit: 10, search },
        });
        console.log("hello", response);
        setApplications(response.data.applications);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        if (error.response) {
          console.error("Error response:", error.response.data);
          console.error("Error status:", error.response.status);
          console.error("Error headers:", error.response.headers);
        } else if (error.request) {
          console.error("Error request:", error.request);
        } else {
          console.error("Error message:", error.message);
        }
      }
    };
    fetchData();
  }, [page, search]);

  const deleteHandler = async (id) => {
    if (typeof id === "string" && id.length === 24) {
      try {
        const response = await api.delete(`/deleteApplication/${id}`);
        if (response.status === 200) {
          const updatedResponse = await api.get(`/fetchApplication`, {
            params: { page, limit: 5, search },
          });

          setApplications(updatedResponse.data.applications);
          setTotalPages(updatedResponse.data.totalPages);
        } else {
          console.error("Failed to delete designation:", response.data.message);
        }
      } catch (error) {
        console.error("Error deleting designation:", error);
      }
    } else {
      console.error("Invalid ID format:", id);
    }
  };

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
          <h2 className="user_manage_app me-auto">Application Management</h2>
          <Link className="btn btn-primary btn-sm" to="/addUserApplication">
            Add New Application
          </Link>
        </div>
        <hr className="user_manage_hr" />
        <div className="d-flex search_box pb-2">
          <p className="">Show 1 to 10 entries</p>
          <input
            className=" input-search form-control"
            type="text"
            placeholder="Passport search ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div>
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
                  isAdmin,
                  isStatus,
                  pending,
                  approve,
                } = user;

                return (
                  <React.Fragment key={_id}>
                    <tr className="tApp_head">
                      <td>{surname}</td>
                      <td> {isAdmin ? "Admin" : givenN} </td>
                      <td>{passport}</td>
                      <td>{isStatus}</td>
                      <td>{pending}</td>
                      <td>{approve}</td>

                      <td className="edit_delete">
                        <Link
                          className="btn btn-white text-primary p-1"
                          to="/userView"
                          state={{
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
                            isStatus,
                            phone,
                            email,
                          }}
                        >
                          View
                        </Link>

                        <Link
                          className="btn btn-white text-primary p-1"
                          to="/editApplication"
                          state={{
                            _id,
                            image,
                            file,
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
                            isStatus,
                            phone,
                            email,
                          }}
                        >
                          Edit
                        </Link>

                        <button
                          className="btn btn-white text-danger p-1"
                          onClick={() => deleteHandler(_id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="pagination justify-content-end mb-3 ">
          <button
            className="btn btn-secondary btn-sm p-1"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Prev
          </button>

          <span className="page-link">
            Page {page} of {totalPages}
          </span>

          <button
            className="btn btn-secondary btn-sm p-1"
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </main>
    </>
  );
};

export default ApplicationManagement;
