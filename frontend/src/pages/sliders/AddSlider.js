import React, { useState } from "react";
import Common from "../../layouts/Common";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/main.css";
import { addSlider } from "./sliderSlice";

const AddSlider = () => {
  const [thumbnail, setThumbnail] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState("Unpublished");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("thumbnail", thumbnail);
    formData.append("title", title);
    formData.append("image", image);
    formData.append("status", status);

    dispatch(addSlider(formData));
    navigate("/slider", { replace: true });
  };

  return (
    <>
      <Common />
      <main>
        <h2>Add New Slide</h2>
        <hr />
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div>
            <label className="form-label" htmlFor="thumbnail">
              Slide Title*
            </label>
            <input
              className="form-control mb-3 p-2"
              type="text"
              placeholder="Enter designation name"
              name="thumbnail"
              value={thumbnail}
              onChange={(e) => {
                setThumbnail(e.target.value);
              }}
              required
            />
          </div>
          <div>
            <label className="form-label" htmlFor="title">
              Slide Content*
            </label>
            <input
              className="form-control mb-3 p-2"
              type="text"
              placeholder="Enter  name"
              name="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              required
            />
          </div>
          <div>
            <label className="form-label" htmlFor="image">
              Image*
            </label>
            <input
              className="form-control mb-3 p-2"
              type="file"
              name="image"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />
          </div>
          <div>
            <label htmlFor="status">Status</label>{" "}
            <select
              className="form-select mb-3 p-2"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="Published">Published</option>{" "}
              <option value="Unpublished">Unpublished</option>{" "}
            </select>{" "}
          </div>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </main>
    </>
  );
};

export default AddSlider;
