import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Common from "../../layouts/Common";
import { useDispatch, useSelector } from "react-redux";
import { deletePage, fetchPage } from "./pageSlice";
import "../../assets/styles/main.css";

const PageManagement = () => {
  const dispatch = useDispatch();

  const { users, status } = useSelector((state) => state.page);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPage());
    }
  }, [status, dispatch]);

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
        className="scrollspy-example me-5"
        tabIndex="0"
        style={{ overflowY: "scroll", maxHeight: "80vh" }}
      >
        <div className="heading-management p-2 d-flex">
          <h2 className="me-auto">Page Management</h2>
          <Link className="" to="/addNewPage">
            <button className="btn btn-primary " type="submit">
              Add New Page
            </button>
          </Link>
        </div>
        <table className="table table-sriped-column">
          <thead className="">
            <tr>
              <th scope="col" className="bg-light">
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
            {users &&
              users.map((user) => {
                console.log(user);
                const { _id, title, content, url } = user;
                return (
                  <tr key={_id}>
                    <td>{title}</td>
                    <td> {status ? "Published" : "Pending"}</td>
                    <td>{content}</td>
                    <td>
                      <a href={url} target="_blank" rel="noopener noreferrer">
                        {url}
                      </a>
                    </td>
                    <td>
                      <Link to="/editPage" state={{ _id, title, content, url }}>
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

export default PageManagement;
