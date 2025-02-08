// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Nav from "react-bootstrap/Nav";
// import { NavLink, useNavigate } from "react-router-dom";
// import "./auth.css";
// import enq from "../assets/images/download.jpeg";
// import { fetchApplication } from "./applications/applicationSlice";

// const VisaEnquiry = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredData, setFilteredData] = useState([]);

//   const { users } = useSelector((state) => state.applications);

//   useEffect(() => {
//     dispatch(fetchApplication());
//   }, [dispatch]);

//   useEffect(() => {
//     if (users) {
//       const searchRegExp = new RegExp(".*" + searchTerm + ".*", "i");
//       const filtered = users.filter((item) => searchRegExp.test(item.passport));
//       setFilteredData(filtered);
//     }
//   }, [users, searchTerm]);

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     try {
//       const searchRegExp = new RegExp(".*" + searchTerm + ".*", "i");
//       const filtered = users.filter((item) => searchRegExp.test(item.passport));
//       setFilteredData(filtered);
//       console.log("Filtered data to navigate:", filtered); // Debug log
//       navigate("/view-one", { state: { filteredData: filtered } });
//     } catch (error) {
//       console.error("Error searching:", error);
//     }
//   };

//   return (
//     <>
//       <div className="p-3">
//         <Nav className="navbar bg-light p-4 ">
//           <img className="enquiry_image" src={enq} alt="visa-logo" />
//           <NavLink className="text-decoration-none">Visa Enquiry</NavLink>
//           <NavLink to="/login" type="submit" className="btn btn-success">
//             Login
//           </NavLink>
//         </Nav>
//         <form className="p-4 form-control" action="/" onSubmit={handleSearch}>
//           <div className="d-flex p-1">
//             <h3>Check Visa Status</h3>
//           </div>
//           <hr />
//           <h5>Please Enter The Following Data</h5>
//           <div className="form-control p-3">
//             <label className="form-label" htmlFor="passport">
//               Passport Number:
//             </label>
//             <input
//               className="form-control mb-3"
//               value={searchTerm}
//               type="text"
//               name="passportNumber"
//               id="passport"
//               onChange={(e) => setSearchTerm(e.target.value)}
//               placeholder="Passport Number"
//             />

//             <label className="form-label" htmlFor="nation">
//               Nationality:
//             </label>
//             <input
//               className="form-control mb-3"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               type="text"
//               name="country"
//               id="country"
//               placeholder="Nationality"
//             />

//             <label className="form-label" htmlFor="dob">
//               Date of Birth:
//             </label>
//             <input
//               className="form-control mb-3"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               type="date"
//               name="dateOfBirth"
//               id="dob"
//             />

//             <button type="submit" className="btn btn-success me-1">
//               Submit
//             </button>
//             <button type="reset" className="btn btn-danger">
//               Clear
//             </button>
//           </div>
//         </form>

//         <p className="footer_area text-bg-dark p-4 text-center">
//           &copy; 2024 Job Visa All Rights Reserved.
//         </p>
//       </div>
//     </>
//   );
// };

// export default VisaEnquiry;

import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import { NavLink, useNavigate } from "react-router-dom";
import "./auth.css";
import enq from "../assets/images/download.jpeg";
import axios from "axios";
import apiUrl from "../secret";

const VisaEnquiry = () => {
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [currentN, setCurrentN] = useState("");
  const [dob, setDob] = useState("");
  const [passport, setPassport] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `${apiUrl}/api/application/fetchApplicationEnquiry`,
        { params: { currentN, dob, passport } }
      );
      console.log("Response:", response.data); // Debugging line
      if (response.data.applications.length > 0) {
        setApplication(response.data.applications[0]);
        navigate("/view-one", {
          state: { application: response.data.applications[0] },
        });
      } else {
        console.log("No application found");
        setError("No application found.");
      }
    } catch (error) {
      console.error("Error fetching application:", error);
      setError("Error fetching application. Please try again."); // Debugging line
    }
    setLoading(false);
  };

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
        <form className="p-4 form-control" onSubmit={handleSubmit}>
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
              value={passport}
              type="text"
              name="passportNumber"
              id="passport"
              onChange={(e) => setPassport(e.target.value)}
              placeholder="Passport Number"
            />

            <label className="form-label" htmlFor="nation">
              Nationality:
            </label>
            <input
              className="form-control mb-3"
              value={currentN}
              onChange={(e) => setCurrentN(e.target.value)}
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
              value={dob}
              onChange={(e) => setDob(e.target.value)}
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

        <p className="footer_area text-bg-dark p-4 text-center">
          &copy; 2024 Job Visa All Rights Reserved.
        </p>
        {application && (
          <div className="application-details">
            <h3>Application Details</h3>
            <p>Name: {application.name}</p>
            <p>Details: {application.details}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default VisaEnquiry;
