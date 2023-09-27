import React, { useState } from 'react'; 
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal'; 
import Tab from 'react-bootstrap/Tab'; 
import LoginForm from '../components/Nav/LoginForm'; 
import SignUpForm from '../components/Nav/SignupForm'; 

export default function Landing() {

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
          {/* ADD LOGIC FOR ./HOME AFTER USER SIGNS UP OR LOGS IN */}
          <button className="home-btn" onClick={openModal}>
            Get Started 
          </button>
        </Container>
      </div>
    
      {/* Modal Feature */}
<Modal size="md" show={showModal} onHide={() => setShowModal(false)} aria-labelledby="signup-modal" className="app-navbar-modal">
  <Tab.Container defaultActiveKey="login">
    <Modal.Header closeButton>
      <Modal.Title id="signup-modal">Welcome to ShelfSwap!</Modal.Title>
        </Modal.Header>
          <Modal.Body style={{ textAlign: 'center' }}>
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
