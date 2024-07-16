import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";
<<<<<<< HEAD
import User from "../models/UserSchema.js";
import paypal from 'paypal-rest-sdk';

// Configure PayPal SDK
paypal.configure({
  'mode': 'live', // or 'live' for production
  'client_id': process.env.PAYPAL_CLIENT_ID,
  'client_secret': process.env.PAYPAL_CLIENT_SECRET
});

export const getCheckoutSession = async (req, res) => {
  try {
    // Get the currently booked doctor
    const doctor = await Doctor.findById(req.params.doctorId);
    const user = await User.findById(req.userId);
    console.log("PayPal Client ID:", process.env.PAYPAL_CLIENT_ID);
    console.log("PayPal Client Secret:", process.env.PAYPAL_CLIENT_SECRET);

    // Create payment JSON
    const create_payment_json = {
      "intent": "sale",
      "payer": {
        "payment_method": "paypal"
      },
      "redirect_urls": {
        "return_url": `${process.env.CLIENT_SITE_URL}/checkout-success/${doctor.id}`,
        "cancel_url": `${req.protocol}://${req.get("host")}/doctors/${doctor.id}`
      },
      "transactions": [{
        "item_list": {
          "items": [{
            "name": doctor.name,
            "sku": "item",
            "price": doctor.ticketPrice.toString(), // Ensure price is a string
            "currency": "BDT",
            "quantity": 1
          }]
        },
        "amount": {
          "currency": "BDT",
          "total": doctor.ticketPrice.toString() // Ensure total is a string
        },
        "description": doctor.bio
      }]
    };

    // Create PayPal payment
    paypal.payment.create(create_payment_json, async (error, payment) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error creating PayPal payment" });
      } else {
        // Create a booking object with the necessary details
        const booking = new Booking({
          doctor: doctor._id,
          user: user._id,
          ticketPrice: doctor.ticketPrice,
          session: payment.id
        });

        // Save the booking object to the database
        await booking.save();

        // Redirect the user to PayPal for payment approval
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === 'approval_url') {
            return res.redirect(payment.links[i].href);
          }
        }

        res.status(500).json({ success: false, message: "No approval URL found in PayPal payment response" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error creating checkout session" });
=======
import Stripe from "stripe";
import User from "../models/UserSchema.js";

export const getCheckoutSession = async (req, res) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    // get the currently booked doctor
    const doctor = await Doctor.findById(req.params.doctorId);
    const user = await User.findById(req.userId);

    // create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.CLIENT_SITE_URL}/checkout-success`,
      cancel_url: `${req.protocol}://${req.get("host")}/doctor/${doctor._id}`,
      customer_email: user.email,
      client_reference_id: req.params.doctorId,
      line_items: [
        {
          price_data: {
            currency: "bdt",
            unit_amount: doctor.ticketPrice * 100,
            product_data: {
              name: doctor.name,
              description: doctor.bio,
              images: [doctor.photo],
            },
          },
          quantity: 1,
        },
      ],
    });

    // Create a booking object with the necessary details
    const booking = new Booking({
      doctor: doctor._id,
      user: user._id,
      ticketPrice: doctor.ticketPrice,
      session: session.id,
    });

    // Save the booking object to the database
    await booking.save();

    // send the created session as a response
    res.status(200).json({ success: true, message: "Success", session });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error creating checkout session" });
>>>>>>> fbc8dfd1dc1e8142d05458c7d646053f0b1a6dbf
  }
};
