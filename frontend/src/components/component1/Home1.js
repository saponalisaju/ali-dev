import React from "react";
import { Link } from "react-router-dom";
import "./home1.css";
import "../../assets/styles/main.css";
import video from "../../assets/videos/abc.mp4";
//import Header from "../../layouts/Header";

const Component1 = () => {
  return (
    <>
      <div className="main_content ">
        <div className="main-one  text-center">
          <div className="video-container">
            <video className="video-content " autoPlay loop muted id="video-bg">
              <source src={video} type="video/mp4" className="" /> Your browser
              does not support the video tag.
            </video>
            <div className="main_heading ">
              <div className="main_heading_one">
                <h1 className="heading-one">
                  Job Europe Visa Canada | Australia | Italy | United States of
                  America |
                </h1>
                <h4 className="heading-two text-white text-center ">
                  Job Europe Visa Provide Clear Advice For Your Migration To
                  Canada, australia, USA. Talk to us for Worker visa , family
                  visa, skilled & business migration, & visitor visa
                </h4>
              </div>
              <div className="button">
                <Link to="/enquiry" type="button" className="btnCheck btn   ">
                  CHECK YOUR APPLICATION STATUS
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Component1;
