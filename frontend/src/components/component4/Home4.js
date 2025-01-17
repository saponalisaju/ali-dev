import React from "react";
import "./Home4.css";
import HmImg from "../../assets/images/9~mv2.webp";
import flag1 from "../../assets/images/flage (4).png";
import flag2 from "../../assets/images/flage(1).png";
import flag3 from "../../assets/images/flag2.png";
import flag4 from "../../assets/images/flag_127- (4).png";
import flag5 from "../../assets/images/flag3.png";
import flag6 from "../../assets/images/images (1).jpeg";

const Component4 = () => {
  return (
    <div className="main-three text-center">
      <div className="w-100 p-2">
        <h4 className="pt-5"> WE MAXIMIZE YOUR VISA APPROVAL GRANTEE</h4>
        <p className="p-4">
          {" "}
          Provide thorough supporting documents, including financial proof and
          travel itinerary?
        </p>
      </div>
      <div className="image_1 w-100 d-flex p-5">
        <div className="my-image_1">
          <img src={HmImg} alt="error" />
        </div>
        <div className="flag_img1 bg-light">
          <img src={flag1} alt="error" />
          <img src={flag2} alt="error" />
          <img src={flag3} alt="error" />
          <img src={flag4} alt="error" />
          <img src={flag5} alt="error" />
        </div>
        <div className="my-image_2">
          <img src={flag6} alt="error" />
        </div>
      </div>
      <div className="main-four bg-light text-center ">
        <h1 className=" p-5">CORPORATE OF YOUR TRAVEL</h1>
        <p className=" pb-5">
          Corporate Travel Management involves planning, booking, and managing
          business trips for a company. It includes creating travel policies.
        </p>
      </div>
    </div>
  );
};

export default Component4;
