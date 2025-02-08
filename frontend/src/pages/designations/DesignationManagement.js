import React, { useState, useEffect } from "react";
import Common from "../../layouts/Common";
import { Link } from "react-router-dom";
import api from "./api";

const DesignationManagement = () => {
  const [designations, setDesignations] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/fetchDesignation", {
          params: { page, limit: 5, search },
        });
        setDesignations(response.data.designations);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        if (error.response) {
          // The request was made, and the server responded with a status code that falls out of the range of 2xx
          console.error("Error response:", error.response.data);
          console.error("Error status:", error.response.status);
          console.error("Error headers:", error.response.headers);
        } else if (error.request) {
          // The request was made, but no response was received
          console.error("Error request:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error message:", error.message);
        }
      }
    };
    fetchData();
  }, [page, search]);

  const deleteHandler = async (id) => {
    if (typeof id === "string" && id.length === 24) {
      try {
        const response = await api.delete(`/deleteDesignation/${id}`);
        if (response.status === 200) {
          const updatedResponse = await api.get(`/fetchDesignation`, {
            params: { page, limit: 5, search },
          });
          setDesignations(updatedResponse.data.designations);
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
      <div className="example6">
        <Common />
      </div>
      <main
        data-bs-spy="scroll"
        data-bs-target="#example6"
        data-bs-offset="0"
        className="scrollspy-example user_manage me-5"
        tabIndex="0"
        style={{ overflowY: "scroll", maxHeight: "80vh" }}
      >
        <div className="user_manage_head d-flex">
          <h2 className="me-auto user_manage_app">Designation Management</h2>
          <Link className="btn btn-primary" to="/addDesignation">
            Add New Designation
          </Link>
        </div>
        <hr className="user_manage_hr" />
        <div className="d-flex search_box">
          <p>Show 1 to 10 entries</p>
          <input
            className="ms-auto input-search form-control"
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <table className="table table-striped-column table-bordered">
          <thead className="">
            <tr className="">
              <th scope="col" className="bg-light">
                NAME
              </th>
              <th scope="col" className="bg-light">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {designations.map((user) => {
              const { _id, name } = user;
              return (
                <tr key={_id}>
                  <td>{name}</td>
                  <td>
                    <Link to="/editDesignation" state={{ _id, name }}>
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
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="pagination justify-content-end">
          <button
            className="btn btn-info"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </button>

          <span className="page-link">
            Page {page} of {totalPages}
          </span>

          <button
            className="btn btn-info"
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

export default DesignationManagement;

// /**eslint-disable */
// import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
// import Common from "../../layouts/Common";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteDesignation, fetchDesignation } from "./DesignationSlice";
// import "../../assets/styles/main.css";

// const DesignationManagement = () => {
//   const dispatch = useDispatch();

//   const { designations, status } = useSelector((state) => state.designations);

//   useEffect(() => {
//     if (status === "idle") {
//       dispatch(fetchDesignation());
//     }
//   }, [status, dispatch]);

//   const deleteHandler = (id) => {
//     if (typeof id === "string" && id.length === 24) {
//       dispatch(deleteDesignation(id));
//     } else {
//       console.error("Invalid ID format:", id);
//     }
//   };

//   return (
//     <>
//       <div className="example6">
//         <Common />
//       </div>
//       <main
//         data-bs-spy="scroll"
//         data-bs-target="#example6"
//         data-bs-offset="0"
//         className="scrollspy-example user_manage me-5"
//         tabIndex="0"
//         style={{ overflowY: "scroll", maxHeight: "80vh" }}
//       >
//         <div className="user_manage_head d-flex">
//           <h2 className="me-auto user_manage_app">Designation Management</h2>
//           <Link className="btn btn-primary" to="/addDesignation">
//             Add New Designation
//           </Link>
//         </div>
//         <hr className="user_manage_hr" />
//         <table className="table table-striped-column table-bordered">
//           <thead className="">
//             <tr className="">
//               <th scope="col" className="bg-light">
//                 NAME
//               </th>
//               <th scope="col" className="bg-light">
//                 ACTION
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {designations &&
//               designations?.map((user) => {
//                 const { _id, name } = user;
//                 return (
//                   <tr key={_id}>
//                     <td>{name}</td>
//                     <td>
//                       <Link to="/editDesignation" state={{ _id, name }}>
//                         <button className="btn btn-white text-primary p-1">
//                           Edit
//                         </button>
//                       </Link>
//                       <button
//                         className="btn btn-white text-danger p-1"
//                         onClick={() => {
//                           deleteHandler(_id);
//                         }}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })}
//           </tbody>
//         </table>
//       </main>
//     </>
//   );
// };

// export default DesignationManagement;
