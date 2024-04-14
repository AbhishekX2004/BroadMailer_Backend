import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

function Payments() {
	return (
		<div>
			<Elements stripe={stripePromise}>
				<PaymentForm />
			</Elements>
		</div>
	);
}

export default Payments;
