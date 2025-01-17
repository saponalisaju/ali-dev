import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Common from "../../layouts/Common";
import { useDispatch, useSelector } from "react-redux";
import "../../assets/styles/main.css";
import { deleteCompany, fetchCompany } from "./companySlice";

const CompanyManagement = () => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.company.users);
  const status = useSelector((state) => state.company.status);
  //const error = useSelector((state) => state.designations.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCompany());
    }
  }, [status, dispatch]);

  const deleteHandler = (id) => {
    if (typeof id === "string" && id.length === 24) {
      dispatch(deleteCompany(id));
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
        className="scrollspy-example me-5"
        tabIndex="0"
        style={{ overflowY: "scroll", maxHeight: "80vh" }}
      >
        <div className="heading-management p-2 d-flex">
          <h2 className="me-auto ">Company Management</h2>
          <Link to="/addNewCompany">
            <button className="btn btn-primary" type="submit">
              Add New Company
            </button>
          </Link>
        </div>
        <table className="table table-sriped-column">
          <thead className="">
            <tr>
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
              users.map((user) => {
                const { _id, name } = user;
                return (
                  <tr key={_id}>
                    <td>{name}</td>
                    <td>
                      <Link to="/editCompany" state={{ _id, name }}>
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

export default CompanyManagement;
