import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Common from "../../layouts/Common";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserManagement,
  deleteUserManagement,
} from "./userManagementSlice";

const UserManagement = () => {
  const { users, status } = useSelector((state) => state.userManagement);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUserManagement());
    }
  }, [status, dispatch]);

  const deleteHandler = (id) => {
    if (typeof id === "string" && id.length === 24) {
      dispatch(deleteUserManagement(id));
    } else {
      console.error("Invalid ID format:", id);
    }
  };
  return (
    <>
      <div className="example2 relative">
        <Common />
      </div>
      <main
        data-bs-spy="scroll"
        data-bs-target="#example2"
        data-bs-offset="0"
        className="scrollspy-example me-5"
        tabIndex="0"
        style={{ overflowY: "scroll", maxHeight: "80vh" }}
      >
        <div className="heading-management p-2 d-flex">
          <h2 className="me-auto">User Management</h2>
          <Link to="/addUserManagement">
            <button className="btn btn-primary" type="submit">
              Add New User
            </button>
          </Link>
        </div>
        <hr />
        {/* {status === "loading" && <p>Loading...</p>}
        {status === "failed" && <p>{error}</p>} */}
        <table className="table table-sriped-column">
          <thead className="">
            <tr className="">
              <th scope="col" className="bg-light">
                NAME
              </th>
              <th scope="col" className="bg-light">
                EMAIL
              </th>
              <th scope="col" className="bg-light">
                ROLE
              </th>
              <th scope="col" className="bg-light">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => {
                const { _id, name, email, role } = user;
                return (
                  <tr key={_id}>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>Admin</td>
                    <td>
                      <Link
                        to="/editUserManagement"
                        state={{ _id, name, email, role }}
                      >
                        <button className="user-button btn btn-white text-primary p-1">
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

export default UserManagement;
