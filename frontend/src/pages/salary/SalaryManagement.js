import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Common from "../../layouts/Common";
import { useDispatch, useSelector } from "react-redux";
import { deleteSalary, fetchSalary } from "./salarySlice";
import "../../assets/styles/main.css";

const SalaryManagement = () => {
  const { users, status } = useSelector((state) => state.salary);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchSalary());
    }
  }, [status, dispatch]);

  const deleteHandler = (id) => {
    if (typeof id === "string" && id.length === 24) {
      dispatch(deleteSalary(id));
    } else {
      console.log("FormData ID ", id);
    }
  };

  return (
    <>
      <div className="example4">
        <Common />
      </div>
      <main
        data-bs-spy="scroll"
        data-bs-target="#example4"
        data-bs-offset="0"
        className="scrollspy-example user_manage me-5"
        tabIndex="0"
        style={{ overflowY: "scroll", maxHeight: "80vh" }}
      >
        <div className="user_manage_head d-flex">
          <h2 className="me-auto user_manage_app">Salary Management</h2>
          <Link className="btn btn-primary" to="/addNewSalary">
            Add New Salary
          </Link>
        </div>
        <hr />
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
                      <Link to="/editSalary" state={{ _id, name }}>
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

export default SalaryManagement;
