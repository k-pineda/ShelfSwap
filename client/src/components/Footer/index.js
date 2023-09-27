import React from 'react';
import './index.css';

const Footer = () => {

  const footerStyle = {
    position: 'relative',
    bottom: 0,
    width: '100%',
    height: '170px', 
    color: '#FFF4F4',
    marginTop:'30%',
  };

  return (
    <div style={footerStyle}>
      <div className="main-footer__lower">
        &copy; 2023 ShelfSwap 
      </div>
    </div>  
  );
};

export default Footer;
