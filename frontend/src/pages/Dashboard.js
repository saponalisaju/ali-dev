import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faFileCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Common from "../layouts/Common";
import "./auth.css";
import axios from "axios";
import apiUrl from "../secret";

const Dashboard = () => {
  const [applications, setApplications] = useState([]);
  const [totalApplication, setTotalApplication] = useState();
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${apiUrl}/api/application/fetchApplication`,
        { params: { page, limit: 10 } }
      );
      console.log(response);
      setApplications(response.data.applications);
      setTotalApplication(response.data.totalApplication);
      setTotalPages(response.data.totalPages);
    };
    fetchData();
  }, [page]);
  return (
    <>
      <Common />
      <main className="contain">
        <div className="super-admin">
          <h2 className="">Dashboard</h2>
          <h4 className="pb-1">Super Admin</h4>
          <hr className="dashboard_hr" />
        </div>
        <div className="d-flex dashboard">
          <div className="total_app">
            <FontAwesomeIcon className="icon" icon={faFileCircleCheck} />
            <h2 className=" ">{totalApplication}</h2>
            <h4 className="">Total Application</h4>
          </div>
          <div className="total_page">
            <FontAwesomeIcon className="icon" icon={faCopy} />
            <h2 className=" ">{page}</h2>
            <h4 className="">Total Pages</h4>
          </div>
        </div>

        {/* Displaying Applications */}
        <div className="applications-list">
          <h3>Applications</h3>
          {applications.map((app, index) => (
            <div key={index} className="application-item">
              <p>{app.name}</p>
              <p>{app.details}</p>
            </div>
          ))}
        </div>
        {/* Pagination Controls */}
        <div className="pagination-controls">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="btn btn-primary me-2"
          >
            Previous
          </button>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="btn btn-primary"
          >
            Next
          </button>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
