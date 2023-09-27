import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import { Navbar, Nav, Modal, Tab } from "react-bootstrap";
import Auth from "../../utils/auth";

const AppNavbar = () => {

  return (
    <>
      <Navbar collapseOnSelect expand="sm">
          <Navbar.Brand id="nav" as={Link} to="./" className="brand brand-logged p-3">
            ShelfSwap
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