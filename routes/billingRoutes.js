import stripe from 'stripe';
import { stripeSecretKey } from '../config/keys.js';

const billingRoutes = async (app) => {
    const stripeInstance = stripe(await stripeSecretKey);
    
    app.post("/api/stripe", async (req, res) => {
        try {
            // Create a PaymentIntent
            const paymentIntent = await stripeInstance.paymentIntents.create({
                amount: req.body.amount,
                currency: req.body.currency,
                automatic_payment_methods: {
                    enabled: true,
                },
                description: "Purchasing Survey Credits",
                receipt_email: req.body.receipt_email,
            });

            // Add credits to the user
            req.user.credits += req.body.amount / 100; // Convert amount to credits
            const user = await req.user.save(); // Save the updated user to the database
            
            // Prepare the response object
            const response = {
                user: user,                     // Include the updated user model
                paymentIntent: paymentIntent,   // Include the PaymentIntent
            };
            
            res.send(response); // Send the response object
        } catch (error) {
            console.error("Error processing payment:", error);
            res.status(500).send({ error: "Error processing payment" });
        }
    });
};

export default billingRoutes; 
