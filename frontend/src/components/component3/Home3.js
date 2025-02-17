import React from "react";
import "./Home3.css";
import Imag1 from "../../assets/images/settings (3).png";
import Imag2 from "../../assets/images/settings (2).png";
import Imag3 from "../../assets/images/gear.png";

const Component3 = () => {
  return (
    <div className="section-two ">
      <div className="main-two ">
        <h1 className="text-center ">HOW DO WE WORK? </h1>
        <h4 className="text-center ">
          Research, plan, execute tasks, communicate effectively, adapt, and
          continuously improve processes?
        </h4>
      </div>
      <div className="section-two-a d-flex bg-light pb-5">
        <div className="para-1 text-center ">
          <img className="border rounded-circle " src={Imag1} alt="loading" />
          <h4 className="">ASSESSMENT</h4>
          <p className="">
            Identify objectives, design tasks, administer assessments, collect
            data, analyze results, provide feedback, and adjust instruction
            based on findings. Bangladesh , we ded this for thousands of our
            valuable clients.
          </p>
        </div>
        <div className="para-2 text-center ">
          <img className="border rounded-circle " src={Imag2} alt="loading" />
          <h4 className="">PROCESSING AND COMMUNICATION</h4>
          <p className="">
            Both processing and communication are essential for successful
            interactions, whether in personal, academic, or professional
            contexts. They ensure that information is not only shared but also
            understood and utilized effectively
          </p>
        </div>
        <div className="para-3 text-center ">
          <img className="border rounded-circle " src={Imag3} alt="loading" />
          <h4 className="">RESULT</h4>
          <p className="">
            Typically, visa processing takes about 3 to 5 weeks. After
            processing, the consulate will notify you of the decision, and the
            visa delivery can take up to two additional workdays.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Component3;
