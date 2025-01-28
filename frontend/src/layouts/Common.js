import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faBars,
  faCircleUser,
  faCube,
  faGear,
  faHome,
  faMapLocationDot,
  faMoneyBills,
  faPaste,
  faSliders,
  faTimes,
  faUsersViewfinder,
} from "@fortawesome/free-solid-svg-icons";

import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./common.css";
import Img from "../assets/images/avatar.png";

const Common = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, []);

  const handleLogout = useCallback(() => {
    const removeCookie = (name) => {
      document.cookie = `${name}=; Max-Age=-99999999; path=/; SameSite=None; Secure`;
    };
    try {
      ["refreshToken"].forEach(removeCookie);
      localStorage.removeItem("token");
      console.log("Logout successful");
      navigate("/");
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  }, [navigate]);

  return (
    <>
      <div className="common_container relative">
        <header className="header_common">
          <div className="header-icon me-auto d-flex">
            <button
              className="btn btn-link sidebar-btn "
              type="button"
              data-toggle="collapse"
              data-target="#wrapper"
              aria-expanded="false"
              aria-label="Toggle navigation"
              aria-controls="wrapper"
              onClick={toggleSidebar}
            >
              <FontAwesomeIcon
                className="sidebar_icon"
                icon={isOpen ? faTimes : faBars}
              />
            </button>
            <div>
              <Link to="/dashboard">World Job Visa</Link>
            </div>
          </div>
          <div className="home-link d-flex">
            <ul className="d-flex">
              <li className="me-4">
                <Link to="/">Home</Link>
              </li>
              <li className="">
                <Link className="header-image me-4" to="/">
                  <img className="" src={Img} alt="loading"></img>
                </Link>
              </li>
            </ul>
          </div>
        </header>
        <div className=" main_body">
          <div className={`d-flex ${isOpen ? "toggled" : ""}`} id="wrapper">
            <aside id="sidebar-wrapper">
              <ul className="">
                <li className="">
                  <Link to="/dashboard">
                    <FontAwesomeIcon icon={faHome} />
                    <span className="">Dashboard</span>
                  </Link>
                </li>
                <li className="">
                  <Link to="/userManagement">
                    <FontAwesomeIcon icon={faUsersViewfinder} />
                    <span className="">User Management</span>
                  </Link>
                </li>
                <li className="">
                  <Link to="/application">
                    <FontAwesomeIcon icon={faAddressCard} />
                    <span className="">Applications</span>
                  </Link>
                </li>
                <li className="">
                  <Link to="/company">
                    <FontAwesomeIcon icon={faCube} />
                    <span className="">Company Management</span>
                  </Link>
                </li>
                <li className="">
                  <Link to="/designation">
                    <FontAwesomeIcon icon={faMapLocationDot} />
                    <span className="">Designations</span>
                  </Link>
                </li>
                <li className="">
                  <Link to="/salary">
                    <FontAwesomeIcon icon={faMoneyBills} />
                    <span className="">Salaries</span>
                  </Link>
                </li>
                <li className="">
                  <Link to="/page">
                    <FontAwesomeIcon icon={faPaste} />
                    <span className="">Pages</span>
                  </Link>
                </li>
                <li className="">
                  <Link to="/slider">
                    <FontAwesomeIcon icon={faSliders} />
                    <span className="">Sliders</span>
                  </Link>
                </li>
                <li className="">
                  <Link to="/profile">
                    <FontAwesomeIcon icon={faCircleUser} />
                    <span className="">Profile</span>
                  </Link>
                </li>
                <li className="">
                  <Link to="/setting">
                    <FontAwesomeIcon icon={faGear} />
                    <span className="">Settings</span>
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="btn btn-secondary ">
                    Logout
                  </button>
                </li>
              </ul>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default Common;
