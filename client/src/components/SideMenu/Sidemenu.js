import React, { useState } from 'react';
import './aside.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Donate from '../Donate/index';

const AsideComponent = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`aside-component ${isHovered ? 'active' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="tab">
        <FontAwesomeIcon icon={faBars} />
      </div>
      <div className="content">
      <p>1. Search Books</p>

<p>2. Add to Owned Books</p>

<p>3. Request to Swap Books</p>

<p>4. Profile</p>


        <Donate></Donate>
      </div>
    </div>
  );
};

export default AsideComponent;
