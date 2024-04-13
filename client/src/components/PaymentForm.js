import React, { useState, useEffect } from 'react';
import {options, useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import M from 'materialize-css';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [amount, setAmount] = useState(1); // Default amount in INR Rs
    const [cardNumberError, setCardNumberError] = useState(null);
    const [expiryError, setExpiryError] = useState(null);
    const [cvcError, setCvcError] = useState(null);

    useEffect(() => {
        const modalElems = document.querySelectorAll('.modal');
        M.Modal.init(modalElems, {});
    }, []);

    const handlePayment = async () => {
        try {
            const response = await axios.post('/api/stripe', {
                amount: amount * 100,   // convert to paise
                currency: 'inr',
            });

            // Uncomment to see the payment intent
            // console.log(response.data.paymentIntent);
            
            // not needed
            // const result = await stripe.confirmCardPayment(clientSecret, {
            //     payment_method: {
            //         card: elements.getElement(CardElement),
            //     },
            // });
            
            console.log('Payment succeeded!');
        } catch (error) {
            console.log(error);
            throw new Error('Payment failed. Please try again later.');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            setError('Stripe.js has not loaded yet.');
            return;
        }

        try {
            await handlePayment();
            const modalInstance = M.Modal.getInstance(document.getElementById('payment-modal'));
            modalInstance.close();
            setAmount(10); // Reset amount to default value
            elements.getElement(CardNumberElement).clear(); // Clear card number
            elements.getElement(CardExpiryElement).clear(); // Clear expiry
            elements.getElement(CardCvcElement).clear(); // Clear cvc
            // setCardNumberError(null); // Reset card number error
            // setExpiryError(null); // Reset expiry error
            // setCvcError(null); // Reset cvc error
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
            <button data-target="payment-modal" className="btn modal-trigger">Add Credits</button>
            <div id="payment-modal" className="modal">
                <h4 style={{ color: "black", textAlign: "center" }}>BroadMailer</h4>
                <p style={{ color: "black", textAlign: "center" }}>Add credits to send surveys. 5 Rs for 5 survey.</p>

                <div className="modal-content">
                    <form onSubmit={handleSubmit}>
                        <label>
                            Amount to Pay (in rupees):
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                // min="0.5" // Minimum amount 0.5 Rs
                                step="10" // Increment by 10 Rs
                            />
                        </label>
                        <label>
                            Card number
                            <CardNumberElement
                                options={options} // Add options if needed
                                onChange={(e) => setCardNumberError(e.error ? e.error.message : null)}
                            />
                            {cardNumberError && <div style={{ color: "red" }}>{cardNumberError}</div>}
                        </label>
                        <label>
                            Expiration date
                            <CardExpiryElement
                                options={options} // Add options if needed
                                onChange={(e) => setExpiryError(e.error ? e.error.message : null)}
                            />
                            {expiryError && <div style={{ color: "red" }}>{expiryError}</div>}
                        </label>
                        <label>
                            CVV
                            <CardCvcElement
                                options={options} // Add options if needed
                                onChange={(e) => setCvcError(e.error ? e.error.message : null)}
                            />
                            {cvcError && <div style={{ color: "red" }}>{cvcError}</div>}
                        </label>
                        {error && <div style={{ color: "red" }}>{error}</div>}
                        <button type="submit" className="btn" disabled={!stripe}>
                            Pay
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default PaymentForm;







// another type of payment form

// <form onSubmit={handleSubmit}>
//     <label>
//         Card details
//         <CardElement
//             options={{
//                 style: {
//                     base: {
//                         fontSize: '16px',
//                         color: '#424770',
//                         '::placeholder': {
//                             color: '#aab7c4',
//                         },
//                     },
//                     invalid: {
//                         color: '#9e2146',
//                     },
//                 },
//             }}
//         />
//     </label>
//     {error && <div>{error}</div>}
//     <button type="submit">Pay</button>
// </form>