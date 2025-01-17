import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { updatePage } from "./pageSlice";
import Common from "../../layouts/Common";
import "../../assets/styles/main.css";

const EditDesignation = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [_id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [published, setPublished] = useState("");
  const [shownOnNavbar, setShownOnNavbar] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    if (location.state) {
      setId(location.state._id);
      setTitle(location.state.title);
      setPublished(location.state.published);
      setShownOnNavbar(location.state.shownOnNavbar);
      setLink(location.state.link);
    } else {
      // Redirect to a safe page if state is null
      navigate("/page");
    }
  }, [location.state, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePage({ _id, title, published, shownOnNavbar, link }));
    navigate("/page");
  };

  return (
    <>
      <Common />
      <main className="me-5">
        <h2>Create New Page</h2>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label className="form-label" htmlFor="title">
              Page Title*
            </label>
            <input
              className="form-control p-2 mb-3"
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Update
          </button>
        </form>
      </main>
    </>
  );
};

export default EditDesignation;
