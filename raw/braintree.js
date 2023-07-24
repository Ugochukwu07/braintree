const braintree = require("braintree");
const { models } = require("mongoose");

// Set up your Braintree credentials
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox, // Use braintree.Environment.Production for live transactions
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY
});

exports.newPlan = async (req, res) => {
  
// const plans = await gateway.plan.all();

    // Define the details of your payment plan
    const planDetails = {
      // id: Math.random() * 10, // Replace with a unique identifier for your plan
      name: req.body.name, // Replace with the name of your plan
      price: req.body.price, // Replace with the price of the plan (in the lowest currency unit, e.g., cents)
      currencyIsoCode: 'USD',
      billingFrequency: 1,
    };

    // Create the payment plan (subscription plan)
    gateway.plan.create(planDetails, (err, result) => {
      if (err) {
        // Handle error
        console.error(err);
      } else if (result.success) {
        // Subscription plan created successfully
        console.log("Plan created:", result.plan.id);
        return res.send({'result': result});
      } else {
        // Handle errors returned in the result object
        console.error(result);
      }
    });
}

exports.newSub = (req, res) => {

  // return createCustomer()

  const info = {
    paymentMethodToken: "dehdd172",
    planId: "g8kw",
    planId: "vn9b"
  }

  // createSubscription("tokencc_bh_nbkttf_s8qm4g_ptcbp7_ssfy55_tv2");

  gateway.subscription.create(info, (err, result) => {
    if (err) {
      // Handle error
      console.error(err);
    } else if (result.success) {
      // Subscription plan created successfully
      console.log("Plan created:", result);
      return res.send({'result': result});
    } else {
      // Handle errors returned in the result object
      console.error(result);
    }
  });

}

createCustomer = () => {
    // Replace with your customer details
  const customerData = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    paymentMethodNonce: "tokencc_bh_nbkttf_s8qm4g_ptcbp7_ssfy55_tv2", // Replace with the actual payment method nonce obtained from the client
  };

  gateway.customer.create(customerData, function (err, result) {
    if (err) {
      // Handle error
      console.error(err);
    } else if (result.success) {
      // Customer and payment method saved successfully
      console.log("Customer ID:", result.customer.id);
      console.log("Payment Method Token:", result.customer.paymentMethods[0].token);
    } else {
      // Handle errors returned in the result object
      console.error(result.errors);
    }
  });

}

exports.newClientID = () => {
  gateway.clientToken.generate({}, function (err, response) {
    if (err) {
      // Handle error
      console.error(err);
    } else {
      // The client token is available in response.clientToken
      const clientToken = response.clientToken;
      // console.log(clientToken)
      // Now you can pass this clientToken to your client-side code
      return clientToken;
    }
  });
}

// module.exports = newPlan;
