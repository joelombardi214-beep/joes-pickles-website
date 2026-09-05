const express = require('express');
const Stripe = require('stripe');

const app = express();
const port = process.env.PORT || 4242;
const baseUrl = process.env.BASE_URL || `http://localhost:${port}`;
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
    console.error('Missing STRIPE_SECRET_KEY. Add it to your environment before starting the server.');
    process.exit(1);
}

const stripe = new Stripe(stripeSecretKey);

app.use(express.json());
app.use(express.static(__dirname));

app.post('/create-checkout-session', async (request, response) => {
    const requestedQuantity = Number.parseInt(request.body.quantity, 10);
    const quantity = Number.isInteger(requestedQuantity) ? Math.min(Math.max(requestedQuantity, 1), 20) : 0;

    if (!quantity) {
        return response.status(400).json({ error: 'Add at least one jar before checking out.' });
    }

    try {
        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Naturally Fermented Pickles'
                        },
                        unit_amount: 1200
                    },
                    quantity
                }
            ],
            payment_method_types: ['card'],
            success_url: `${baseUrl}/?payment=success`,
            cancel_url: `${baseUrl}/?payment=cancelled`
        });

        return response.json({ url: session.url });
    } catch (error) {
        console.error('Stripe Checkout error:', error.message);
        return response.status(500).json({ error: 'Stripe could not start checkout. Please try again.' });
    }
});

app.listen(port, () => {
    console.log(`Joe's Pickles is running at ${baseUrl}`);
});
