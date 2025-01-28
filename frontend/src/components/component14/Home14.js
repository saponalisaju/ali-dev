/*eslint-disable*/

import React, { useEffect, useState } from "react";
import "./Home14.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiscord,
  faFacebook,
  faTwitter,
  faVimeo,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import Images1 from "../../assets/images/wp5399284.jpg";

const Component14 = () => {
  return (
    <>
      <div className="fourteen">
        <div className="">
          <img className="fixed_image relative" src={Images1} alt="image" />
        </div>
        <div className="absolute">
          <div className="form-area text-center ">
            <div className="contact_us_area  text-light ">
              <h2>Contact Us</h2>
              <p className="">
                Just fill up the form below. Our expert will contact with you
                soon.
              </p>
            </div>
            <div className="d-flex form-body">
              <div className="contact_information text-center  ">
                <h4 className="">CONTACT INFORMATION</h4>
                <FontAwesomeIcon
                  icon={faDiscord}
                  className="icon border border-3 p-4 rounded-circle"
                />
                <p className="">write us or contact us on our social media</p>
                <FontAwesomeIcon
                  icon={faFacebook}
                  className="icon border border-2  rounded-circle"
                />
                <FontAwesomeIcon
                  icon={faTwitter}
                  className="icon border border-2  rounded-circle"
                />
                <FontAwesomeIcon
                  icon={faYoutube}
                  className="icon border border-2  rounded-circle"
                />
                <FontAwesomeIcon
                  icon={faVimeo}
                  className="icon border border-2  rounded-circle"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Component14;
