import React from 'react';
import '../CssFiles/subscriptionpage.css';
import Header from './header'
import { useNavigate } from 'react-router-dom';
import { useWalletContext } from '../contexts/Wallet';
import { useState } from 'react';
import { useEffect } from 'react';
const SubscriptionPage = () => {
  const { isConnected, address, getUserBalance, createTransaction } = useWalletContext()
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    if (address) {
      getUserBalance(address)
        .then(data => setBalance(data))
        .catch(err => console.log(err))
    }
  }, [address])

  const navigate = useNavigate()
  const plans = [
    { title: 'Plan 1', description: '1 Month(s) ', price: 0.1 },
    { title: 'Plan 2', description: '2 Month(s)', price: 0.3 },
    { title: 'Plan 3', description: '3 Month(s)', price: 0.5 },
    { title: 'Plan 4', description: '4 Month(s) ', price: 0.6 },
    { title: 'Plan 5', description: '8 Month(s)', price: 0.9 },
    { title: 'Plan 6', description: '12 Month(s)', price: 1.2 }
  ];
  const handlesubscribe = (id, amount) => {
    createTransaction(id, amount)
      .then(() => navigate("/subscribed"))
      .catch((err) => console.log(err))
  }
  return (
    <div>
      <Header />
      <div className="subscription-plans-page">

        {isConnected ? (
          <div>
            <p>Address: {address}</p>
            <p>Balance: {balance} ETH</p>
          </div>
        ) : <p>No Wallet Connected</p>}

        <div className="plan-container">
          {plans.map((plan, index) => (
            <div className="plan-card" key={index}>
              <h2>{plan.title}</h2>
              <p>{plan.description}</p>
              <p>{plan.price} ETH</p>
              <button onClick={() => handlesubscribe(index, plan.price)} className="subscribe-button">Subscribe</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
