import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Common from "../../layouts/Common";
import { useDispatch, useSelector } from "react-redux";
import { deletePage, fetchPage } from "./pageSlice";
import "../../assets/styles/main.css";
//import PagesList from "../../components/PagesList";

const PageManagement = () => {
  const dispatch = useDispatch();

  const { users, status } = useSelector((state) => state.page);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPage());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (status === "succeeded") {
      console.log("Data fetched successfully:", users);
    }
  }, [status, users]);

  const deleteHandler = (id) => {
    dispatch(deletePage(id));
  };
  return (
    <>
      <div className="example5">
        <Common />
      </div>

      <main
        data-bs-spy="scroll"
        data-bs-target="#example5"
        data-bs-offset="0"
        className="scrollspy-example user_manage me-5"
        tabIndex="0"
        style={{ overflowY: "scroll", maxHeight: "80vh" }}
      >
        <div className="user_manage_head  d-flex">
          <h2 className="me-auto user_manage_app">Page Management</h2>
          <Link className="btn btn-primary " to="/addNewPage">
            Add New Page
          </Link>
        </div>
        <hr />
        <table className="table table-striped-column table-bordered">
          <thead className="">
            <tr>
              <th scope="col" className="bg-light ">
                SL No.
              </th>
              <th scope="col" className="bg-light ">
                TITLE
              </th>
              <th scope="col" className="bg-light">
                PUBLISHED
              </th>
              <th scope="col" className="bg-light">
                SHOWN ON NAVBAR
              </th>
              <th scope="col" className="bg-light">
                LINK
              </th>
              <th scope="col" className="bg-light">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) ? (
              users?.map((user) => {
                const { _id, title, content, link } = user;
                return (
                  <tr key={_id}>
                    <td>{title}</td>
                    <td>{status ? "Published" : "Pending"}</td>
                    <td>{content}</td>
                    <td>
                      <a href={link} target="_blank" rel="noopener noreferrer">
                        {link}
                      </a>
                    </td>
                    <td>
                      <Link
                        to="/editPage"
                        state={{ _id, title, content, link }}
                      >
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
              })
            ) : (
              <tr>
                <td colSpan="2">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
        {/* <PagesList /> */}
      </main>
    </>
  );
};

export default PageManagement;
