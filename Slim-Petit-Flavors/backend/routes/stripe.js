const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const uuid = require("uuid").v4;

router.get("/", (req, res) => {
  res.send({message:"Stripe checkout endpoint!"})
});

router.post("/", async (req, res, next) => {
  try {
    const { cart, token } = req.body;
 
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
 
    const idempotencyKey = uuid();
    const charge = await stripe.charges.create(
      {
        amount: cart.cartTotalAmount * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchase for ${cart.cartTotalAmount * 100}`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip,
          },
        },
      },
      {
        idempotencyKey,
      }
    );
 
    res.status(200).json("Successful payment.")
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
