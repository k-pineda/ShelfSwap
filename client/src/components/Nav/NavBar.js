import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import { Navbar, Nav, Modal, Tab } from "react-bootstrap";
import Auth from "../../utils/auth";

const AppNavbar = () => {

  return (
    <>
      <Navbar collapseOnSelect expand="sm">
          <Navbar.Brand as={Link} to="./" className="brand brand-logged">
            ShelfSwap
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
          <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
            <Nav>
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to={`/profile`}>
                    Profile
                  </Nav.Link>
                  <Nav.Link as={Link} to="/swap">
                    Swap Books
                  </Nav.Link>
                  <Nav.Link as={Link} to="/chat">
                    Messages
                  </Nav.Link>
                  <Nav.Link onClick={Auth.logout}>
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