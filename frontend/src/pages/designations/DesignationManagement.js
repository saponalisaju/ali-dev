/**eslint-disable */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Common from "../../layouts/Common";
import { useDispatch, useSelector } from "react-redux";
import { deleteDesignation, fetchDesignation } from "./DesignationSlice";
import "../../assets/styles/main.css";

const DesignationManagement = () => {
  const dispatch = useDispatch();

  const { users, status } = useSelector((state) => state.designations);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchDesignation());
    }
  }, [status, dispatch]);

  const deleteHandler = (id) => {
    if (typeof id === "string" && id.length === 24) {
      dispatch(deleteDesignation(id));
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
          <h2 className="me-auto heading-heading-btn">
            Designation Management
          </h2>
          <Link to="/addDesignation">
            <button className="btn btn-primary" type="submit">
              Add New Designation
            </button>
          </Link>
        </div>
        <hr className="user_manage_hr" />
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
            {users &&
              users?.map((user) => {
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
      </main>
    </>
  );
};

export default DesignationManagement;
