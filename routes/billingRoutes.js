import stripe from 'stripe';
import { stripeSecretKey } from '../config/keys.js';


const billingRoutes = async (app) => {
    const stripeInstance = stripe(stripeSecretKey);
    
    app.post("/api/stripe", async (req, res) => {
        console.log(req.body);

        // Use the stripe instance to perform operations
        // For example:
        // const paymentIntent = await stripeInstance.paymentIntents.create({
        //   amount: 1000,
        //   currency: 'usd',
        // });
    });
};

export default billingRoutes;
