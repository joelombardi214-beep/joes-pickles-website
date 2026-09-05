# Joe's Pickles Stripe Checkout

## Setup

1. Install Node.js from https://nodejs.org/.
2. In this folder, run `npm install`.
3. Copy `.env.example` to `.env`.
4. Put your Stripe **test** secret key in `.env` as `STRIPE_SECRET_KEY`.
5. Run `npm start`.
6. Open `http://localhost:4242`.

Use Stripe test card `4242 4242 4242 4242`, any future expiry date, and any three-digit CVC.

Apple Pay appears in Stripe Checkout when it is enabled in Stripe Dashboard and the site is served from an eligible HTTPS domain. Do not put the Stripe secret key in `index.html` or commit `.env`.
