import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal'; 
import Tab from 'react-bootstrap/Tab'; 
import LoginForm from '../components/Nav/LoginForm'; 
import SignUpForm from '../components/Nav/SignupForm'; 

export default function Landing() {
  const navigate = useNavigate();
  const loggedIn = Auth.loggedIn();

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  return (
    <>
      <div>
        <Container className="home d-flex flex-column align-items-center justify-content-center flex-wrap text-center">
          <h1 className="home-title">Your Digital Bookshelf: Books at Your Fingertips</h1>
          <p className="home-text">
            List, Swap, and Discover New Books!
          </p>
          <button className="home-btn" onClick={openModal}>
            Sign Up Here
          </button>
        </Container>
      </div>

      {/* Modal Feature */}
      <Modal size="lg" show={showModal} onHide={() => setShowModal(false)} aria-labelledby="signup-modal" className="app-navbar-modal">
        <Tab.Container defaultActiveKey="login">
          <Modal.Header closeButton>
            <Modal.Title id="signup-modal">Sign Up / Log In</Modal.Title>
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
}
