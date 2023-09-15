import React, { useState } from 'react';
import './aside.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
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
      <FontAwesomeIcon icon={faCircleInfo} beatFade size="2xl" style={{color: "#820000",}} />
      </div>
      <div className="content">
      <p>Welcome to ShelfSwap!</p> 

<p>1. Login or SignUp</p>

<p>2. Search For Books</p>

<p>3. Add Books You Own To Your Profile</p>

<p>4. Swap Page Will Show All Books Available To Swap</p>

<p>5. Try Messaging Another User To Set Up A Book Swap!</p>


        <Donate></Donate>
      </div>
    </div>
  );
};

export default AsideComponent;
