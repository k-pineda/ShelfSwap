import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import './style.css'; 

const stripePromise = loadStripe('pk_test_51Nns84Gbq8mRzxQQYXLeZMCWuqCtqz9x2stK1tKRobvHMf6NXqNfToq2mqc6g2Pp2NYYEeCVSfcB5I3RnsLVjIwK00vmmnQaq6');

const Donate = () => {
  const [paymentStatus, setPaymentStatus] = useState('');
  const [amount, setAmount] = useState(0); 

  const handleDonateClick = async () => {
    try {
      const response = await fetch('/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount * 100, 
        }),
      });

      const { sessionId } = await response.json();

      const stripe = await stripePromise;
      const result = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });

      if (result.error) {
        console.error('Error redirecting to Stripe Checkout:', result.error);
      }
    } catch (error) {
      console.error('Error creating Stripe session:', error);
    }
  };

  return (
    <section className="donation-container">
      <h2>Make a Donation</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter donation amount"
      />
      <button onClick={handleDonateClick} className="donate-button">
        Donate Now
      </button>
      {paymentStatus && <p>{paymentStatus}</p>}
    </section>
  );
};

export default Donate;
