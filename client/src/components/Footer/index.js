import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="w-100 mt-auto bg-secondary p-1">
      <div className="container text-center mb-5">
        {location.pathname !== '/' && (
          <button
            className="btn btn-dark mb-3"
            onClick={() => navigate(-1)}
          >
            &larr; Go Back
          </button>
        )}
        <h4>
        Designed &amp; coded{' '}
          <span
            className="emoji"
            role="img"
            aria-label="heart"
            aria-hidden="false"
          >
            ❤️
          </span>{' '}
          by the Ranch Trio team.
          <div><a href="https://github.com/k-pineda" target="_blank" class="hover">Karen</a></div>
          <div><a href="https://github.com/Josiahr4321" target="_blank" class="hover">Josiah</a></div>
          <div><a href="https://github.com/Anthony-D99" target="_blank" class="hover">Anthony</a></div>
        </h4>
      </div>
    </footer>
  );
};

export default Footer;






