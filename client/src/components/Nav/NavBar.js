import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import { Navbar, Nav} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Auth from "../../utils/auth";
import shelfSwapLogo from "../../assets/Shelf_Swap_Final_Logo.png";

const AppNavbar = () => {

  return (
    <>
      <Navbar collapseOnSelect expand="sm">
      <Navbar.Brand as={Link} to="./home " className="brand brand-logged p-3">
      <img id="nav" src={shelfSwapLogo} alt="ShelfSwap-Logo" />
      </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
          <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
            <Nav className="p-3">
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link id="nav" as={Link} to={`/profile`}>
                    Profile
                  </Nav.Link>
                  <Nav.Link id="nav" as={Link} to="/swap">
                    Swap 
                  </Nav.Link>
                  <Nav.Link id="nav" as={Link} to="/chat">
                    Messages
                  </Nav.Link>
                  <Nav.Link id="nav" onClick={Auth.logout}>
                    Logout
                  </Nav.Link>
                </>
              ) : null}
            </Nav>
          </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default AppNavbar;