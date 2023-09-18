import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Modal, Tab } from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER_BY_ID } from "../../utils/queries";
import AuthService from "../../utils/auth";
import jwt_decode from "jwt-decode";
import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";
import Auth from "../../utils/auth";
import shelfSwapLogo from "../../assets/Shelf_Swap_Final_Logo.png";
import "./navBar.css";

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  let userId = sessionStorage.getItem("userId");

  // Initialize username
  let username = "";

  const token = AuthService.getToken();

  if (!userId && token) {
    // If userId is not in sessionStorage but there is a token, decode it and set userId
    const decodedToken = jwt_decode(token);
    userId = decodedToken.data._id;

    // Store userId in sessionStorage to persist it across page navigations
    sessionStorage.setItem("userId", userId);
  }

  const { loading, data } = useQuery(QUERY_USER_BY_ID, {
    variables: { userId },
    skip: !token,
  });

  if (data) {
    const user = data.userById;
    username = user.username;
  }

  return (
    <>
      <Navbar id="nav" expand="lg" className="ps-5">
        <Container fluid id="nav">
          <Navbar.Brand as={Link} to="./">
            <img id="nav" src={shelfSwapLogo} alt="Shelf-Swap_logo" />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            style={{ backgroundColor: "white" }}
          />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="ml-auto d-flex align-items-end">
              <Nav.Link id="nav" as={Link} to="/swap">
                Swap Books!
              </Nav.Link>
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to={`/profile/${username}`} id="nav">
                    Profile
                  </Nav.Link>
                  <Nav.Link as={Link} to="/chat" id="nav">
                    Messages
                  </Nav.Link>
                  <Nav.Link id="nav" onClick={Auth.logout}>
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link id="nav" onClick={() => setShowModal(true)}>
                  Login/Sign Up
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="signup-modal"
        className="app-navbar-modal"
      >
        <Tab.Container defaultActiveKey="login">
          <Modal.Header closeButton>
            <Modal.Title id="signup-modal"></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey="login">
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey="signup">
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;