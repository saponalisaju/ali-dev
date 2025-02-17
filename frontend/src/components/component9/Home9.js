import React from "react";
import "./Home9.css";
import AssortM from "../../assets/images/assortment_23-21.jpg";

const Component9 = () => {
  return (
    <div className="main-nine d-flex bg-light ">
      <div className="nine-one ">
        <div className="nine-one-a">
          <h1 className="">To get a work visa in Europe; you need to </h1>
          <p>
            Start by researching the specific work visa requirements of the
            country where you intend to work. Each country has its own criteria,
            so understanding these upfront is crucial. Factors like job offers,
            qualifications, and financial stability play a role.
          </p>
        </div>
        <div className="nine-two d-flex">
          <div className="nine-two-a">
            <span className="">
              <p>
                <strong>Valid Passport</strong>
              </p>
              <p>
                Ensure it's no older than ten years and valid for at least three
                more months beyond your planned exit from the Schengen
                territory.
              </p>
            </span>
            <span className="">
              <p>
                <strong>Employment Contract</strong>
              </p>
              <p>
                Signed between you and your future employer within the Schengen
                territory..
              </p>
            </span>
          </div>
          <div className="nine-two-b">
            <span className="">
              <p>
                <strong>Proof of Accommodation</strong>
              </p>
              <p>
                document showing where you'll reside in the Schengen
                Area.Diplomas, certificates, transcripts, etc.
              </p>
            </span>
            <span className="">
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
      <div className="nine-three">
        <img className=" " src={AssortM} alt="loading error" />
      </div>
    </div>
  );
};

export default Component9;
