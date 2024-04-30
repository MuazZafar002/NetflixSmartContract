import React, { useState, useEffect } from 'react';
import '../CssFiles/subscribedpage.css'; // Import updated CSS for subscription page styling
import Header from './header'
import { Link } from 'react-router-dom';
const SubscribedPage = () => {
const [isSubscribed, setIsSubscribed] = useState(false);

  return (
    <div>
      <Header />
    <div className="subscription-page">
      <h1 className="subscription-page-heading">Welcome To Netflix</h1>
        <h3 className="subscription-page-status">Congratulations You are successfully subscribed to Netflix!</h3>
    </div>
    </div>
  );
};

export default SubscribedPage;
