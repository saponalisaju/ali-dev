import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Common from "../../layouts/Common";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserManagement,
  deleteUserManagement,
} from "./userManagementSlice";
import "../../assets/styles/main.css";
import toast, { Toaster } from "react-hot-toast";

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
      toast.success("User deleted successfully");
    } else {
      toast.error("Invalid ID format: " + id);
    }
  };
  return (
    <>
      <div className="example2 relative">
        <Common />
      </div>
      <Toaster />
      <main
        data-bs-spy="scroll"
        data-bs-target="#example2"
        data-bs-offset="0"
        className="scrollspy-example user_manage me-5"
        tabIndex="0"
        style={{ overflowY: "scroll", maxHeight: "80vh" }}
      >
        <div className="user_manage_head  d-flex">
          <h2 className="me-auto ">User Management</h2>
          <Link to="/addUserManagement">
            <button className="btn btn-primary  " type="submit">
              Add New User
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
              users?.map((user) => {
                const { _id, name, email, role } = user;
                console.log(user);
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
