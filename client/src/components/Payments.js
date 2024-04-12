import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { connect } from "react-redux";
import * as actions from "../actions";
import { Axios as axios } from 'axios';

const handlePayment = async (stripe, elements) => {
  try {
    // Make HTTP POST request to backend endpoint to create a payment intent
    const response = await axios.post('/api/stripe', {
      amount: 1000, // Amount in cents // USD
      currency: 'usd',
    });

    const clientSecret = response.data.clientSecret;

    // Confirm the card payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      // Payment failed
      throw new Error(result.error.message);
    } else {
      // Payment succeeded
      console.log('Payment succeeded:', result.paymentIntent);
    }
  } catch (error) {
    throw new Error('Payment failed. Please try again later.');
  }
};

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setError('Stripe.js has not loaded yet.');
      return;
    }

    // Handle payment submission using the provided function
    try {
      await handlePayment(stripe, elements);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Card number
        <CardElement />
      </label>
      {error && <div>{error}</div>}
      <button type="submit">Pay</button>
    </form>
  );
}

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

function Payments() {
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(true);
  };

  return (
    <div>
      {!showForm && (
        <button onClick={handleButtonClick}>Proceed to Payment</button>
      )}
      {showForm && (
        <Elements stripe={stripePromise}>
          <PaymentForm />
        </Elements>
      )}
    </div>
  );
}

export default connect(null, actions)(Payments);
