import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import './style.css';

const stripePromise = loadStripe(
  'pk_live_51Nns84Gbq8mRzxQQzvVnHoGJ8ELj925EFztYDZ7nN4spr5hjpMGGwlq44t5CSdV3SSTKreAI6jIpJws7FNFbjVSh002dZdLAiF'
);

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
      <div className="donation-header">
        <h2>Contribute!</h2>
        <p>Your donations feed our families</p>
      </div>
      <div className="donation-form">
        <label htmlFor="donation-amount">Donation Amount:</label>
        <input
          type="number"
          id="donation-amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount in USD"
        />
        <button onClick={handleDonateClick} className="donate-button">
          Donate Now
        </button>
      </div>
      {paymentStatus && <p className="payment-status">{paymentStatus}</p>}
    </section>
  );
};

export default Donate;
