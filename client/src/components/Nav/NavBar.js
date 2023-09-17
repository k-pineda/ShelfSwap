import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import Auth from '../../utils/auth';
import shelfSwapLogo from '../../assets/Shelf_Swap_Final_Logo.png'
import './navBar.css'

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    <Navbar id='nav' expand='lg' className='ps-5'>
      <Container fluid id='nav'>
        <Navbar.Brand as={Link} to='./'>
          <img id='nav' src={shelfSwapLogo} alt='Shelf-Swap_logo' />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{backgroundColor: "white"}} />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          <Nav className='ml-auto d-flex align-items-end'>
            <Nav.Link id='nav' as={Link} to='/swap'>
              Swap Books!
            </Nav.Link>
            {Auth.loggedIn() ? (
              <>
                <Nav.Link as={Link} to='/profile' id='nav'>
                  Profile
                </Nav.Link>
                <Nav.Link as={Link} to='/chat' id='nav'>
                  Messages
                </Nav.Link>
                <Nav.Link id='nav' onClick={Auth.logout}>Logout</Nav.Link>
              </>
            ) : (
              <Nav.Link id='nav' onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'
        className="app-navbar-modal"
      >
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
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
