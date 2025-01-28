import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faFileCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Common from "../layouts/Common";
import "./auth.css";

const Dashboard = () => {
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
            <h2 className=" ">14</h2>
            <h4 className="">Total Application</h4>
          </div>
          <div className="total_page">
            <FontAwesomeIcon className="icon" icon={faCopy} />
            <h2 className=" ">0</h2>
            <h4 className="">Total Pages</h4>
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
