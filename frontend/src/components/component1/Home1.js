import React from "react";
import { Link } from "react-router-dom";
import "./home1.css";

const Component1 = () => {
  return (
    <>
      <div className="main_content">
        <div className="main-one  text-center">
          <div className="main-one-content text-center"></div>
          <div>
            <h1 className="heading-one p-1">
              {" "}
              Job Europe Visa Canada | Australia | Italy | United States of
              America |{" "}
            </h1>
            <h4 className="heading-two text-white text-center ">
              {" "}
              Job Europe Visa Provide Clear Advice For Your Migration To Canada,
              australia, USA. Talk to us for Worker visa , family visa, skilled
              & business migration, & visitor visa
            </h4>
          </div>
          <div className="button">
            <Link
              to="/application"
              type="button"
              className="btnCheck btn  p-4 m-2"
            >
              CHECK YOUR APPLICATION STATUS
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Component1;
