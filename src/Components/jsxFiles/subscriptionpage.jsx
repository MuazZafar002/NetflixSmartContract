import React from 'react';
import '../CssFiles/subscriptionpage.css';
import Header from './header'
import { useNavigate} from 'react-router-dom';
const SubscriptionPage = () => {
  const navigate=useNavigate()
  const plans = [
    { title: 'Plan 1', description: '1 Month(s) ', price: '0.1 ETH' },
    { title: 'Plan 2', description: '2 Month(s)', price: '0.3 ETH' },
    { title: 'Plan 3', description: '3 Month(s)', price: '0.5 ETH' },
    { title: 'Plan 4', description: '4 Month(s) ', price: '0.6 ETH' },
    { title: 'Plan 5', description: '8 Month(s)', price: '0.9 ETH' },
    { title: 'Plan 6', description: '12 Month(s)', price: '1.2 ETH' }
  ];
const handlesubscribe=()=>{
  navigate('/subscribed')
}
  return (
    <div>
      <Header />
    <div className="subscription-plans-page">
      <div className="plan-container">
        {plans.map((plan, index) => (
          <div className="plan-card" key={index}>
            <h2>{plan.title}</h2>
            <p>{plan.description}</p>
            <p>{plan.price}</p>
            <button onClick={handlesubscribe} className="subscribe-button">Subscribe</button>
          </div>
          
        ))}
      </div>
    </div>
    </div>
  );
};

export default SubscriptionPage;
