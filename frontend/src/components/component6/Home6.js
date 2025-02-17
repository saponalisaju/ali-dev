import React from "react";
import "./Home6.css";
import HexaImg from "../../assets/images/541384.png";

const Component6 = () => {
  return (
    <div className="main-six d-flex ">
      <div className="border main-six-one">
        <img src={HexaImg} alt="loading" />
        <h4>Flexible Code</h4>
        <p className="">
          These strategies help create code that can evolve with changing
          requirements and reduce maintenance costs. If you have any specific
          questions or need further details, feel free to ask!
        </p>
      </div>
      <div className=" border main-six-two">
        <img src={HexaImg} alt="loading" />
        <h4>Flexible Code</h4>
        <p className="">
          These strategies help create code that can evolve with changing
          requirements and reduce maintenance costs. If you have any specific
          questions or need further details, feel free to ask!!
        </p>
      </div>
    </div>
  );
};

export default Component6;
