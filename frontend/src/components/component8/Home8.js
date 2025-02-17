import React from "react";
import "./Home8.css";
import AppImg from "../../assets/images/front 140725-155650.jpg";
import AppImg1 from "../../assets/images/map-3953229_960_720.webp";
import AppImg2 from "../../assets/images/gerbera-1684436_960_720.jpg";
import AppImg3 from "../../assets/images/open-sign-1309682_960_720.jpg";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";

const Home8 = () => {
  return (
    <div className="image-eight bg-light ">
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner ">
          <div className="carousel-item active ">
            <img src={AppImg} className="d-block " alt="slide" />
          </div>
          <div className="carousel-item">
            <img src={AppImg1} className="d-block " alt="slide" />
          </div>
          <div className="carousel-item">
            <img src={AppImg2} className="d-block " alt="slide" />
          </div>

          <div className="carousel-item">
            <img src={AppImg3} className="d-block " alt="slide" />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {/* <img className="eight_image " src={AppImg} alt="loading error" /> */}
    </div>
  );
};

export default Home8;
