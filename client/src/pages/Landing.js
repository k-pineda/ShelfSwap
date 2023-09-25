import * as React from 'react';
import { useNavigate } from "react-router-dom";
import Auth from "../utils/auth"
import Container from "react-bootstrap/Container";

export default function Landing() {
  const navigate = useNavigate();
  const loggedIn = Auth.loggedIn()

  return (
    <div className="homepage">
      {<Container className="home d-flex flex-column align-items-center justify-content-center flex-wrap text-center">
        <h1 className="home-title">Your Digital Bookshelf: Books at Your Fingertips</h1>
        <p className="home-text">
        List, Swap, and Discover New Books!
        </p>
        {loggedIn ?
          (<button className="home-btn" onClick={() => navigate("/exercise")}>Add Exercise</button>) :
          (<button className="home-btn" onClick={() => navigate("/signup")}>Get Started</button>)}
      </Container> }
    </div>
  );
}