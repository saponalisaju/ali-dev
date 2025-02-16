import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareFacebook,
  faSquareTwitter,
  faVimeo,
  faSquareYoutube,
} from "@fortawesome/free-brands-svg-icons";
import img from "../../assets/images/photo-1159947707.jpg";
import "./Home13.css";

const Component13 = () => {
  return (
    <div className="thirteen text-center bg-secondary text-light">
      <h1 className="">Our Team</h1>
      <h4 className="">
        Meet with our talented team who are exeptional expereince for your job
        visa consultancy.
      </h4>
      <div className="section-thr d-flex justify-content-around ">
        <div className="">
          <img className="charlotte_image " src={img} alt="loading error" />
          <h4>Charlotte Hogg</h4>
          <h5>CEO Officer </h5>
          <FontAwesomeIcon
            icon={faSquareFacebook}
            className="p-1 bg-warning m-1"
          />
          <FontAwesomeIcon
            icon={faSquareTwitter}
            className="p-1 bg-warning m-1"
          />
          <FontAwesomeIcon
            icon={faSquareYoutube}
            className="p-1 bg-warning m-1"
          />
          <FontAwesomeIcon icon={faVimeo} className="p-1 bg-warning m-1" />
        </div>
        <div className="">
          <img className="kelly_image " src={img} alt="loading error" />
          <h4>Kelly Mohan Tullier</h4>
          <h5>CPCO and Corporate Secretory</h5>
          <FontAwesomeIcon
            icon={faSquareFacebook}
            className="p-1 bg-warning m-1"
          />
          <FontAwesomeIcon
            icon={faSquareTwitter}
            className="p-1 bg-warning m-1"
          />
          <FontAwesomeIcon
            icon={faSquareYoutube}
            className="p-1 bg-warning m-1"
          />
          <FontAwesomeIcon icon={faVimeo} className="p-1 bg-warning m-1" />
        </div>
        <div className="">
          <img className="hoffmeister_image " src={img} alt="loading error" />
          <h4>James H Hoffmeister</h4>
          <h5>CFO Officer</h5>
          <FontAwesomeIcon
            icon={faSquareFacebook}
            className="p-1 bg-warning m-1"
          />
          <FontAwesomeIcon
            icon={faSquareTwitter}
            className="p-1 bg-warning m-1"
          />
          <FontAwesomeIcon
            icon={faSquareYoutube}
            className="p-1 bg-warning m-1"
          />
          <FontAwesomeIcon icon={faVimeo} className="p-1 bg-warning m-1" />
        </div>
      </div>
    </div>
  );
};

export default Component13;
