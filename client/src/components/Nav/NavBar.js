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
      <Navbar bg='dark' variant='dark' expand='lg' className="bs-danger ">
        <Container fluid>
        <Navbar.Brand  as={Link} className='offset-5' to='./'>
            <img src={shelfSwapLogo} alt='Shelf-Swap_logo' />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar' />

          <Navbar.Collapse id='navbar' className='d-flex flex-row-reverse app-navbar-content'>
            <Nav className='ml-auto d-flex'>
              <Nav.Link as={Link} to='/swap'>
                Books Available To Swap
              </Nav.Link>
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to='/profile'>
                    See Your Books
                  </Nav.Link>
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
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
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              {/* <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login' className="app-navbar-label">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup' className="app-navbar-label">Sign Up</Nav.Link>
                </Nav.Item>
              </Nav> */}
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
