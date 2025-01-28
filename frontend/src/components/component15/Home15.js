import React from "react";
import "./Home15.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboardUser,
  faChartSimple,
  faCubes,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

const Component15 = () => {
  return (
    <div className="component_fifteen text-center">
      <h1 className="application_process  text-center bg-tertiary-subtle ">
        Our Application Process
      </h1>
      <div className="bacground_page ">
        <div className="main_content_item  d-flex  bg-light  ">
          <div className="main-item-one ">
            <div className="processing_item_one">
              <FontAwesomeIcon icon={faPaperPlane} className="display-4 icon" />
              <h4 className="">ONLINE APPLICATION</h4>
              <p className="">
                A visa is an official document issued by a country's government
                that allows a foreign national to enter, stay, or work within
                that country for a specific purpose and duration.Emigration
                refers to the act of leaving one's home country to settle
                permanently in another country.
              </p>
            </div>
            <div className="processing_item_two ">
              <FontAwesomeIcon
                icon={faChartSimple}
                className="display-4 icon"
              />
              <h4>VISA FEES</h4>
              <p className="">
                It's like a permission slip for international travel, granting
                access to a particular country.There are various types of visas,
                such as tourist visas, work visas, student visas, and
                family-based visas.
              </p>
            </div>
          </div>
          <div className="main-item-two">
            <div className="processing_item_three ">
              <FontAwesomeIcon icon={faCubes} className="display-4 icon" />
              <h4>BIOMETRIC ACCEPT</h4>
              <p className="">
                {" "}
                Biometrics refer to objective measurements of physical
                characteristics unique to an individual. These measurements,
                when captured and stored in a database, can be used for identity
                verification or comparison against other entries.
              </p>
            </div>
            <div className="processing_item_four ">
              <FontAwesomeIcon
                icon={faChalkboardUser}
                className="display-4 icon"
              />
              <h4>VISA DECISION AND VALIDITY</h4>
              <p className="">
                {" "}
                While I can't predict the exact outcome, many applicants who
                receive this letter eventually receive a decision—either
                approval or rejection—within a short period.The visa validity
                refers to the period during which you are allowed to travel to a
                U.S. port of entry
              </p>
            </div>
          </div>
        </div>
      </div>
      <p className="copyright ">&copy; 2024 job visa Europes.</p>
    </div>
  );
};

export default Component15;
