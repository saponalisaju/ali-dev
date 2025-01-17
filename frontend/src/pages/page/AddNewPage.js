import React, { useState } from "react";
import Common from "../../layouts/Common";
import { useDispatch, useSelector } from "react-redux";
import { addPage } from "./pageSlice";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/main.css";

const AddNewPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState(false);
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const numberOfUser = useSelector((state) => state.page.users.length);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      id: numberOfUser + 1,
      title,
      content,
      url,
      status,
    };
    console.log(user);
    dispatch(addPage(user));
    navigate("/page", { replace: true });
  };

  return (
    <>
      <Common />
      <main className="me-5">
        <h2>Create New Page</h2>
        <hr />
        <form onSubmit={handleSubmit}>
          <div>
            <label className="form-label" htmlFor="title">
              Page Title*
            </label>
            <input
              className="form-control p-2 mb-3"
              id="title"
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
            <input
              className="form-control p-2 mb-3"
              id="content"
              type="text"
              name="content"
              placeholder=""
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="form-label " htmlFor="url">
              Enter your link:
            </label>
            <input
              className="form-control p-2 mb-3"
              type="url"
              id="url"
              name="url"
              placeholder="https://example.com"
              defaultValue={"http://www.jobsvisa.com"}
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                console.log(e.target.value);
              }}
              required
            />{" "}
          </div>
          <div>
            <input
              className="form-check-input me-3"
              type="checkbox"
              id="check"
              checked={status}
              onChange={(e) => {
                setStatus(e.target.checked);
              }}
            />
            <label className="form-check-label mb-3" htmlFor="check">
              Publish
            </label>
          </div>

          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </main>
    </>
  );
};

export default AddNewPage;
