// /** eslint-disable */
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faAddressCard,
//   faBars,
//   faCircleUser,
//   faCube,
//   faGear,
//   faHome,
//   faMapLocationDot,
//   faMoneyBills,
//   faPaste,
//   faSliders,
//   faTimes,
//   faUsersViewfinder,
// } from "@fortawesome/free-solid-svg-icons";

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "../assets/styles/main.css";
// import Img from "../assets/images/avatar.png";

// const Common = () => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = useState(false);
//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleLogout = () => {
//     const removeCookie = (name) => {
//       document.cookie = `${name}=; Max-Age=-99999999; path=/`;
//     };

//     try {
//       setUser(null);
//       ["accessToken", "refreshToken"].forEach(removeCookie);
//       localStorage.removeItem("token");

//       console.log("Logout successful");
//       navigate("/");
//     } catch (error) {
//       console.error("An error occurred during logout:", error);
//     }
//   };

//   return (
//     <>
//       <div>
//         <header className="">
//           <div className="header-icon me-auto d-flex">
//             <button
//               className="btn btn-link sidebar-btn mb-1"
//               type="button"
//               data-toggle="collapse"
//               data-target="#wrapper"
//               aria-expanded="false"
//               aria-label="Toggle navigation"
//               aria-controls="wrapper"
//               onClick={toggleSidebar}
//             >
//               <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
//             </button>

//             <Link to="/dashboard">
//               <h4>World Job Visa</h4>
//             </Link>
//           </div>
//           <div className="home-link d-flex ">
//             <ul className="">
//               <li className="">
//                 <Link to="/">Home</Link>
//               </li>
//             </ul>
//             <ul className="image-head ">
//               <li className="">
//                 <Link className="header-image" to="/">
//                   <img className="" src={Img} alt="loading"></img>
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </header>
//         <div className=" main_body">
//           <div className={`d-flex ${isOpen ? "toggled" : ""}`} id="wrapper">
//             <aside id="sidebar-wrapper" className="">
//               <ul className="">
//                 <li className="">
//                   <Link to="/dashboard">
//                     <FontAwesomeIcon icon={faHome} />
//                     <span className="">Dashboard</span>
//                   </Link>
//                 </li>
//                 <li className="">
//                   <Link to="/userManagement">
//                     <FontAwesomeIcon icon={faUsersViewfinder} />
//                     <span className="">User Management</span>
//                   </Link>
//                 </li>
//                 <li className="">
//                   <Link to="/application">
//                     <FontAwesomeIcon icon={faAddressCard} />
//                     <span className="">Applications</span>
//                   </Link>
//                 </li>
//                 <li className="">
//                   <Link to="/company">
//                     <FontAwesomeIcon icon={faCube} />
//                     <span className="">Company Management</span>
//                   </Link>
//                 </li>
//                 <li className="">
//                   <Link to="/designation">
//                     <FontAwesomeIcon icon={faMapLocationDot} />
//                     <span className="">Designations</span>
//                   </Link>
//                 </li>
//                 <li className="">
//                   <Link to="/salary">
//                     <FontAwesomeIcon icon={faMoneyBills} />
//                     <span className="">Salaries</span>
//                   </Link>
//                 </li>
//                 <li className="">
//                   <Link to="/page">
//                     <FontAwesomeIcon icon={faPaste} />
//                     <span className="">Pages</span>
//                   </Link>
//                 </li>
//                 <li className="">
//                   <Link to="/slider">
//                     <FontAwesomeIcon icon={faSliders} />
//                     <span className="">Sliders</span>
//                   </Link>
//                 </li>
//                 <li className="">
//                   <Link to="/profile">
//                     <FontAwesomeIcon icon={faCircleUser} />
//                     <span className="">Profile</span>
//                   </Link>
//                 </li>
//                 <li className="">
//                   <Link to="/setting">
//                     <FontAwesomeIcon icon={faGear} />
//                     <span className="">Settings</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <>
//                     <button
//                       onClick={handleLogout}
//                       className="btn btn-secondary"
//                     >
//                       {" "}
//                       Logout
//                     </button>
//                   </>
//                 </li>
//               </ul>
//             </aside>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Common;

import React, { useState, useCallback } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/main.css";
import Img from "../assets/images/avatar.png";

const Sidebar = ({ isOpen, toggleSidebar, handleLogout }) => (
  <aside id="sidebar-wrapper" className={`d-flex ${isOpen ? "toggled" : ""}`}>
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
        <button onClick={handleLogout} className="btn btn-secondary">
          Logout
        </button>
      </li>
    </ul>
  </aside>
);

const Common = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, []);

  const handleLogout = useCallback(() => {
    const removeCookie = (name) => {
      document.cookie = `${name}=; Max-Age=-99999999; path=/`;
    };

    try {
      ["accessToken", "refreshToken"].forEach(removeCookie);
      localStorage.removeItem("token");

      console.log("Logout successful");
      navigate("/");
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  }, [navigate]);

  return (
    <>
      <div>
        <header className="">
          <div className="header-icon me-auto d-flex">
            <button
              className="btn btn-link sidebar-btn mb-1"
              type="button"
              data-toggle="collapse"
              data-target="#wrapper"
              aria-expanded="false"
              aria-label="Toggle navigation"
              aria-controls="wrapper"
              onClick={toggleSidebar}
            >
              <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
            </button>
            <Link to="/dashboard">
              <h4>World Job Visa</h4>
            </Link>
          </div>
          <div className="home-link d-flex ">
            <ul className="">
              <li className="">
                <Link to="/">Home</Link>
              </li>
            </ul>
            <ul className="image-head ">
              <li className="">
                <Link className="header-image" to="/">
                  <img className="" src={Img} alt="loading"></img>
                </Link>
              </li>
            </ul>
          </div>
        </header>
        <div className=" main_body">
          <div className="d-flex" id="wrapper">
            <Sidebar
              isOpen={isOpen}
              toggleSidebar={toggleSidebar}
              handleLogout={handleLogout}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Common;
