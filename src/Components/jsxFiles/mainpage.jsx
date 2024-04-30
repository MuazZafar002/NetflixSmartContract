import React, { useState, useEffect } from 'react';
import '../CssFiles/mainpage.css'; // Import updated CSS for subscription page styling
import Header from './header'
import { Link } from 'react-router-dom';
const MainPage = () => {
const [isSubscribed, setIsSubscribed] = useState(false);

  return (
    <div>
      <Header />
    <div className="subscription-page">
      <h1 className="subscription-page-heading">Subscribe to Netflix</h1>
      {isSubscribed ? (
        <p className="subscription-page-status">You are subscribed to Netflix!</p>
      ) : (
      <Link to="/subscription" className="subscription-page-button" style={{textDecoration:'none'}}>
        Subscribe Now
      </Link>
      )}
      <button className="subscription-page-button">Login</button>
    </div>
    </div>
  );
};

export default MainPage;
