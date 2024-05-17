import React, { useState, useEffect } from 'react';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import M from 'materialize-css';
import { connect } from "react-redux";
import { handleToken } from '../actions';

function mapStateToProps(state) {
    return { auth: state.auth };
}

const PaymentForm = ({ handleToken, auth }) => {

    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [amount, setAmount] = useState(1); // Default amount in INR Rs
    const [cardNumberError, setCardNumberError] = useState(null);
    const [expiryError, setExpiryError] = useState(null);
    const [cvcError, setCvcError] = useState(null);
    const [cardNumberComplete, setCardNumberComplete] = useState(false);
    const [expiryComplete, setExpiryComplete] = useState(false);
    const [cvcComplete, setCvcComplete] = useState(false);

    useEffect(() => {
        const modalElems = document.querySelectorAll('.modal');
        M.Modal.init(modalElems, {});
    }, []);

    const handlePayment = async () => {
        try {
            if (amount <= 0) {
                setError("Amount should be a positive number.");
                return;
            } else if (!Number.isInteger(parseFloat(amount))) {
                setError("Amount should be a whole number.");
                return;
            } else {
                const response = await axios.post('/api/stripe', {
                    amount: amount * 100,   // convert to paise
                    currency: 'inr',
                    receipt_email: auth.email
                });

                // Dispatch handleToken action with the token data
                handleToken(response.data.user);

                alert('Payment succeeded!');
            }
        } catch (err) {
            setError('Payment failed. Please try again later.');
            console.error('Payment error:', err);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            setError('Stripe.js has not loaded yet.');
            return;
        }

        setError(null);

        if (!cardNumberComplete) {
            setCardNumberError('Card number is incomplete.');
            return;
        }

        if (!expiryComplete) {
            setExpiryError('Expiration date is incomplete.');
            return;
        }

        if (!cvcComplete) {
            setCvcError('CVV is incomplete.');
            return;
        }

        try {
            await handlePayment();
            const modalInstance = M.Modal.getInstance(document.getElementById('payment-modal'));
            modalInstance.close();
            setAmount(10);                                  // Reset amount to default value
            elements.getElement(CardNumberElement).clear(); // Clear card number
            elements.getElement(CardExpiryElement).clear(); // Clear expiry
            elements.getElement(CardCvcElement).clear();    // Clear cvc
            setCardNumberError(null);                       // Reset card number error
            setExpiryError(null);                           // Reset expiry error
            setCvcError(null);                              // Reset cvc error
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <div id="payment-modal" className="modal">
                <h4 style={{ color: "black", textAlign: "center", height: '30px', margin: '15px 0 5px 0' }}>BroadMailer</h4>
                <p style={{ color: "black", textAlign: "center", height: '30px', margin: '0 0 5px 0', lineHeight: '1.5' }}>Add credits to send surveys. 5 Rs for 5 surveys.</p>

                <div className="modal-content" style={{ padding: '4px' }}>
                    <form onSubmit={handleSubmit} style={{ margin: '0 40px 0 40px' }}>
                        <label>
                            Amount to Pay (in rupees):
                        </label>
                        <input
                            style={{ margin: '0' }}
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(parseInt(e.target.value, 10))}
                            step="10" // Increment by 10 Rs
                        />
                        <label>
                            Card number
                        </label>
                        <CardNumberElement
                            options={{ showIcon: true }} // Add options if needed
                            onChange={(e) => {
                                setCardNumberError(e.error ? e.error.message : null);
                                setCardNumberComplete(e.complete);
                            }}
                        />
                        {cardNumberError && <div style={{ color: "red" }}>{cardNumberError}</div>}
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ flex: '0 0 calc(50% - 12px)' }}>
                                <label style={{ lineHeight: '1.5', whiteSpace: 'nowrap' }}>
                                    Expiration Date
                                </label>
                                <CardExpiryElement
                                    options={{ style: { base: { fontSize: '16px' } } }} // Add options if needed
                                    onChange={(e) => {
                                        setExpiryError(e.error ? e.error.message : null);
                                        setExpiryComplete(e.complete);
                                    }}
                                />
                                {expiryError && <div style={{ color: "red" }}>{expiryError}</div>}
                            </div>
                            <div style={{ flex: '0 0 calc(50% - 12px)', marginLeft: '12px' }}>
                                <label style={{ lineHeight: '1.5' }}>
                                    CVV
                                </label>
                                <CardCvcElement
                                    options={{ style: { base: { fontSize: '16px' } } }} // Add options if needed
                                    onChange={(e) => {
                                        setCvcError(e.error ? e.error.message : null);
                                        setCvcComplete(e.complete);
                                    }}
                                />
                                {cvcError && <div style={{ color: "red" }}>{cvcError}</div>}
                            </div>
                        </div>

                        {error && <div style={{ color: "red" }}>{error}</div>}
                        <button type="submit" className="btn" style={{ display: 'block', margin: '5px auto' }} disabled={!stripe}>
                            Pay 
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default connect(mapStateToProps, { handleToken })(PaymentForm);






























// Old Code  (too many issues to continue)

// import React, { useState, useEffect } from 'react';
// import { options, useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
// import axios from 'axios';
// import M from 'materialize-css';
// import { connect } from "react-redux";
// import { handleToken } from '../actions';

// function mapStateToProps(state) {

//     // uncomment to see the auth fetch process 
//     // {null -> false} or {null -> user}
//     // console.log(state);

//     return { auth: state.auth };
// }

// const PaymentForm = ({ handleToken, auth }) => { // Destructure handleToken from props

//     const stripe = useStripe();
//     const elements = useElements();
//     const [error, setError] = useState(null);
//     const [amount, setAmount] = useState(1); // Default amount in INR Rs
//     const [cardNumberError, setCardNumberError] = useState(null);
//     const [expiryError, setExpiryError] = useState(null);
//     const [cvcError, setCvcError] = useState(null);

//     useEffect(() => {
//         const modalElems = document.querySelectorAll('.modal');
//         M.Modal.init(modalElems, {});
//     }, []);

//     const handlePayment = async () => {
//         try {
//             if (amount <= 0 || !Number.isInteger(parseFloat(amount))) {
//                 throw new Error();
//             } else {
//                 const response = await axios.post('/api/stripe', {
//                     amount: amount * 100,   // convert to paise
//                     currency: 'inr',
//                     receipt_email: auth.email
//                 });

//                 // Dispatch handleToken action with the token data
//                 handleToken(response.data.user);

//                 // Uncomment to see the payment intent
//                 // console.log(response.data.paymentIntent);

//                 // not needed
//                 // const result = await stripe.confirmCardPayment(clientSecret, {
//                 //     payment_method: {
//                 //         card: elements.getElement(CardElement),
//                 //     },
//                 // });

//                 alert('Payment succeeded!');
//             }
//         } catch (err) {
//             let errorMessage;
//             if (amount <= 0) {
//                 errorMessage = "Amount should be a positive number.";
//             } else if (!Number.isInteger(parseFloat(amount))) {
//                 errorMessage = "Amount should be a whole number.";
//             } else {
//                 errorMessage = 'Payment failed. Please try again later.';
//             }
//             console.log(errorMessage);
//             throw new Error(errorMessage);
//         }
//     };


//     // TODO :: Form submits without the card details

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         if (!stripe || !elements) {
//             setError('Stripe.js has not loaded yet.');
//             return;
//         }

//         setError(null);

//         if (!elements.getElement(CardNumberElement).getElement().value) {
//             setCardNumberError('Card number is required.');
//             return;
//         }

//         if (!elements.getElement(CardExpiryElement).getElement().value) {
//             setExpiryError('Expiration date is required.');
//             return;
//         }

//         if (!elements.getElement(CardCvcElement).getElement().value) {
//             setCvcError('CVV is required.');
//             return;
//         }

//         try {
//             await handlePayment();
//             const modalInstance = M.Modal.getInstance(document.getElementById('payment-modal'));
//             modalInstance.close();
//             setAmount(10);                                  // Reset amount to default value
//             elements.getElement(CardNumberElement).clear(); // Clear card number
//             elements.getElement(CardExpiryElement).clear(); // Clear expiry
//             elements.getElement(CardCvcElement).clear();    // Clear cvc
//             setCardNumberError(null);                       // Reset card number error
//             setExpiryError(null);                           // Reset expiry error
//             setCvcError(null);                              // Reset cvc error
//         } catch (error) {
//             setError(error.message);
//         }
//     };

//     return (
//         <div>
//             {/* 
//                 // since a common button was added in the header for all screen sizes this button is no longer needed.
//                 <button data-target="payment-modal" className="btn modal-trigger">Add Credits</button> 
//             */}
//             <div id="payment-modal" className="modal">
//                 <h4 style={{ color: "black", textAlign: "center", height: '30px', margin: '15px 0 5px 0' }}>BroadMailer</h4>
//                 <p style={{ color: "black", textAlign: "center", height: '30px', margin: '0 0 5px 0', lineHeight: '1.5' }}>Add credits to send surveys. 5 Rs for 5 survey.</p>

//                 <div className="modal-content" style={{ padding: '4px' }}>
//                     <form onSubmit={handleSubmit} style={{ margin: '0 40px 0 40px' }}>
//                         <label>
//                             Amount to Pay (in rupees):
//                         </label>
//                         <input
//                             style={{ margin: '0' }}
//                             type="number"
//                             value={amount}
//                             onChange={(e) => setAmount(e.target.value)}
//                             // min="1" // Minimum amount 1 Rs
//                             step="10" // Increment by 10 Rs
//                         />
//                         <label>
//                             Card number
//                         </label>
//                         <CardNumberElement
//                             options={options} // Add options if needed
//                             onChange={(e) => setCardNumberError(e.error ? e.error.message : null)}
//                         />
//                         {cardNumberError && <div style={{ color: "red" }}>{cardNumberError}</div>}
//                         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                             <div style={{ flex: '0 0 calc(50% - 12px)' }}>
//                                 <label style={{ lineHeight: '1.5' , whiteSpace: 'nowrap'}}>
//                                     Expiration Date
//                                 </label>
//                                 <CardExpiryElement
//                                     options={options} // Add options if needed
//                                     onChange={(e) => setExpiryError(e.error ? e.error.message : null)}
//                                 />
//                                 {expiryError && <div style={{ color: "red" }}>{expiryError}</div>}
//                             </div>
//                             <div style={{ flex: '0 0 calc(50% - 12px)', marginLeft: '12px' }}>
//                                 <label style={{ lineHeight: '1.5' }}>
//                                     CVV
//                                 </label>
//                                 <CardCvcElement
//                                     options={options} // Add options if needed
//                                     onChange={(e) => setCvcError(e.error ? e.error.message : null)}
//                                 />
//                                 {cvcError && <div style={{ color: "red" }}>{cvcError}</div>}
//                             </div>
//                         </div>

//                         {error && <div style={{ color: "red" }}>{error}</div>}
//                         <button type="submit" className="btn" style={{ display: 'block', margin: '5px auto' }} disabled={!stripe}>
//                             Pay 
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default connect(mapStateToProps, { handleToken })(PaymentForm); // Connect handleToken action creator



// // another type of payment form

// // <form onSubmit={handleSubmit}>
// //     <label>
// //         Card details
// //         <CardElement
// //             options={{
// //                 style: {
// //                     base: {
// //                         fontSize: '16px',
// //                         color: '#424770',
// //                         '::placeholder': {
// //                             color: '#aab7c4',
// //                         },
// //                     },
// //                     invalid: {
// //                         color: '#9e2146',
// //                     },
// //                 },
// //             }}
// //         />
// //     </label>
// //     {error && <div>{error}</div>}
// //     <button type="submit">Pay</button>
// // </form>