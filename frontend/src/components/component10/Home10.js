import React from "react";
import "./Home10.css";
import { Link } from "react-router-dom";
import flg1 from "../../assets/images/flag_127- (4).png";
import flg2 from "../../assets/images/flage6(6).jpeg";
import flg3 from "../../assets/images/flag2.png";
import flg4 from "../../assets/images/flag3.png";
import flg5 from "../../assets/images/flag7 (4).png";
import flg6 from "../../assets/images/flag8_1 (4).png";
import flg7 from "../../assets/images/flage (4).png";
import flg8 from "../../assets/images/flage(1).png";

const Component10 = () => {
  return (
    <div className="section-nine bg-info-subtle">
      <div className="section-nine-one text-center">
        <h1 className="">Apply and Check your eligibility</h1>
        <p className="security_account">
          You can check the status of your disability benefits application
          online using your personal my Social Security account{" "}
          <Link to="https://www.nationwideedu.com/">
            {" "}
            visa process to work in Europe.{" "}
          </Link>
        </p>
      </div>
      <div className="flag_all text-center">
        <img src={flg1} alt="error" />
        <img src={flg2} alt="error" />
        <img src={flg3} alt="error" />
        <img src={flg4} alt="error" />
        <img src={flg5} alt="error" />
        <img src={flg6} alt="error" />
        <img src={flg7} alt="error" />
        <img src={flg8} alt="error" />
      </div>
    </div>
  );
};

export default Component10;
