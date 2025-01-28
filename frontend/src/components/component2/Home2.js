import React from "react";
import "./Home2.css";
import Img1 from "../../assets/images/gear.png";
import Img2 from "../../assets/images/4479650.png";
import Imag3 from "../../assets/images/setting.png";

const Component2 = () => {
  return (
    <>
      <div className="section-one d-flex ">
        <div className="para1 text-center ">
          <img className="border rounded-circle " src={Img1} alt="loading" />
          <h4 className="">ELIGIBILITY ASSESSMENT</h4>
          <span className="">
            Determine visa type, review specific requirements, complete
            application accurately, gather supporting documents, pay necessary
            fees, schedule and attend interview, provide biometrics, demonstrate
            strong ties to home country, and wait for processing.
          </span>
        </div>
        <div className="para2 text-center ">
          <img className="border rounded-circle " src={Img2} alt="loading" />
          <h4>VISA PROCESS</h4>
          <span className="">
            Research visa type, complete application accurately, gather required
            documents, pay fees, schedule and attend interview, provide
            biometrics, wait for processing, receive decision, and prepare for
            travel. Ensure all information is truthful and consistent to
            maximize approval chances.{" "}
          </span>
        </div>
        <div className="para3 text-center ">
          <img className="border rounded-circle " src={Imag3} alt="loading" />
          <h4>REFUSAL APPEAL</h4>
          <span className="">
            Write a detailed appeal letter addressing refusal reasons, provide
            supporting documents, explain why the decision was incorrect, and
            submit to the relevant embassy or consulate. Ensure your appeal is
            well-structured, factual, and persuasive to maximize the chances of
            overturning the refusal.
          </span>
        </div>
      </div>
    </>
  );
};

export default Component2;
