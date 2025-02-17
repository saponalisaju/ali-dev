import React from "react";
import "./Home12.css";
import { Link } from "react-router-dom";
import photo1 from "../../assets/images/free-photo-of-london-from-the-shard.jpeg";

const Component12 = () => {
  return (
    <div>
      <div className="content_component_twelve ">
        <img src={photo1} alt="loading" className=" image_twelve" />
        <div className="content_check ">
          <h1>Already Applied?</h1>
          <h1>Check Your Status Here!</h1>
        </div>
        <Link
          to="/application"
          className="btn btn-warning btn_check"
          type="button"
        >
          CHECK STATUS
        </Link>
      </div>
    </div>
  );
};

export default Component12;
