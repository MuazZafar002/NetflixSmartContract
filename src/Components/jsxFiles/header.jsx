import React from 'react';
import '../CssFiles/header.css'; 

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <img src="/netflix-logo.jpg" alt="Netflix Logo" />
      </div>
      <div className="navigation">
        {/* Add navigation links if needed */}
      </div>
    </div>
  );
};

export default Header;
