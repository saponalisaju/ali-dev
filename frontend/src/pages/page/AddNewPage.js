import React, { useState } from "react";
import Common from "../../layouts/Common";
import { useDispatch, useSelector } from "react-redux";
import { addPage } from "./pageSlice";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/main.css";

const AddNewPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("Published");
  const [link, setLink] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const numberOfUser = useSelector((state) => state.page.users.length);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      title.length < 3 ||
      title.length > 31 ||
      content.length < 3 ||
      content.length > 31
    ) {
      setError("Title or Content must be between 3 and 31 characters long.");
      return;
    }
    const user = {
      id: numberOfUser + 1,
      title,
      content,
      link,
      status,
    };
    console.log(user);
    dispatch(addPage(user));
    navigate("/page", { replace: true });
  };
  return (
    <>
      <Common />
      <main className="add_user">
        <h2>Create New Page</h2>
        <hr className="user_manage_hr" />
        <form onSubmit={handleSubmit}>
          <div>
            <label className="form-label" htmlFor="title">
              Page Title*
            </label>
            <input
              className="form-control p-2 mb-3"
              type="text"
              name="title"
              placeholder="Enter page title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="form-label " htmlFor="content">
              Page Content*
            </label>
            <textarea
              className="form-control p-2 mb-3"
              name="content"
              placeholder="Enter Content"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                setError("");
              }}
              required
            ></textarea>
          </div>
          <div>
            <label className="form-label " htmlFor="link">
              Enter your link:
            </label>
            <input
              className="form-control p-2 mb-3"
              type="text"
              name="link"
              placeholder="https://example.com"
              value={link}
              onChange={(e) => {
                setLink(e.target.value);
              }}
              required
            />
          </div>
          <div>
            <label className="form-check-label mb-3" htmlFor="status">
              Status
            </label>
            <select
              className="form-select p-2 mb-3"
              name="status"
              value={status}
              onChange={(e) => {
                setStatus(e.target.checked);
                setError("");
              }}
            >
              <option value="Published">Published</option>
              <option value="Unpublished">Unpublished</option>
            </select>
          </div>
          {error && <div style={{ color: "red" }}>{error}</div>}
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </main>
    </>
  );
};

export default AddNewPage;
