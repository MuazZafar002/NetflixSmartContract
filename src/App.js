import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SubscriptionPage from './Components/jsxFiles/subscriptionpage';
import MainPage from './Components/jsxFiles/mainpage';
import SubscribedPage from './Components/jsxFiles/subscribedpage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/subscription" element={<SubscriptionPage />} />
        <Route path='/subscribed' element={<SubscribedPage />} />
      </Routes>
    </Router>
  );
}

export default App;
