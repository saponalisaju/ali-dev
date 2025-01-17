import React from "react";
import "./Home7.css";
import GImag from "../../assets/images/9~mv2.webp";

const Component7 = () => {
  return (
    <div className="main-seven bg-light d-flex">
      <div className="image_first p-4  d-flex ">
        <img src={GImag} alt="error" />
      </div>
      <div className="main-seven-one p-3 ">
        <div className="">
          <p>
            <strong>Job visa</strong>
          </p>
          <h4>Your Ultimate Guide to Get visas </h4>
          <p>
            Research visa requirements, complete accurate applications, gather
            supporting documents, pay fees, attend interviews, and prepare for
            travel. Bon voyage!
          </p>
        </div>
        <div className=" d-flex">
          <div className="">
            <span>
              <p>
                <strong>Job Offering</strong>
              </p>
              <p>
                A global leader in payments and technology, offers diverse job
                roles across 200+ countries.
              </p>
            </span>
            <span>
              <p>
                <strong>Full Support</strong>
              </p>
              <p className="">
                Intra-Company Transferee Visa (L-Visa): If your company
                transfers you to Japan.
              </p>
            </span>
          </div>
          <div className=" ">
            <span>
              <p>
                <strong>Processing Talently</strong>
              </p>
              <p>
                Discover how Visa teams reimagine what's possible in the world
                of money movement.
              </p>
            </span>
            <span>
              <p>
                <strong>Great Experience</strong>
              </p>
              <p>
                Get a positive skills assessment for a job on Australia's
                Skilled Occupations List.
              </p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Component7;
