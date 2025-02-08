import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import "./header.css";
import logo from "../../assets/images/Logo 2 Final.png";

const Header = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Navbar expand="lg" className={`fixed-top ${active ? "active-nav" : ""}`}>
        <NavLink to="/">
          <img className="_img" src={logo} alt="Logo" />
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav bg-light" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto me-4">
            <NavLink className="btnHome" to="/">
              HOME
            </NavLink>
            <NavLink className="btnHome" to="/enquiry">
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
