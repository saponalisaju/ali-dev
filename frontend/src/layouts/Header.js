import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../assets/styles/main.css";
import logo from "../assets/images/Logo 2 Final.png";

const Header = () => {
  const [active, setActive] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setActive(true);
      } else {
        setActive(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Navbar expand="lg" className={active ? "activenav" : ""}>
        <img src={logo} alt="error" className="image_logo" />
        <Navbar.Toggle aria-controls="basic-navbar-nav bg-light" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="btnHome" to="/">
              HOME
            </NavLink>
            <NavLink className="btnHome" to="/visaEnquiry">
              VISA ENQUIRY
            </NavLink>
            <NavLink className="btnHome" to="/login">
              SIGN IN
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
