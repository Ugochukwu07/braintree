const gateway = require('../services/braintree')

exports.newPlan = async (req, res) => {  
    // Define the details of your payment plan
    const planDetails = {
      id: Math.random() * 10, // Replace with a unique identifier for your plan
      name: req.body.name, // Replace with the name of your plan
      price: req.body.price, // Replace with the price of the plan (in the lowest currency unit, e.g., cents)
      currencyIsoCode: 'USD',
      billingFrequency: 1,
    };

    // Create the payment plan (subscription plan)
    result = gateway.newPlan(planDetails)

    if(result.success){
        res.send(result.result)
    }else{
        res.status(500).send(result.result)
    }
}

exports.payment = async (req, res) => {
    try {
        const id = await gateway.newClientID();
        if (id.success) {
            res.render('pay', { id: id.token });
        } else {
            // Handle the case when generating the client token fails
            res.status(500).send('Error generating client token');
        }
    } catch (err) {
        // Handle other errors that might occur during the payment process
        console.error(err);
        res.status(500).send('An error occurred');
    }
}

// exports.newSub = (req, res) => {

//   // return createCustomer()

//   const info = {
//     paymentMethodToken: "dehdd172",
//     planId: "g8kw",
//     planId: "vn9b"
//   }

//   // createSubscription("tokencc_bh_nbkttf_s8qm4g_ptcbp7_ssfy55_tv2");

//   gateway.subscription.create(info, (err, result) => {
//     if (err) {
//       // Handle error
//       console.error(err);
//     } else if (result.success) {
//       // Subscription plan created successfully
//       console.log("Plan created:", result);
//       return res.send({'result': result});
//     } else {
//       // Handle errors returned in the result object
//       console.error(result);
//     }
//   });

// }

exports.createCustomer = async (res, req) => {
    // Replace with your customer details
    const customerData = {
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        paymentMethodNonce: req.body.payment_token, // Replace with the actual payment method nonce obtained from the client
    };

    
}

// exports.newClientID = () => {
//   gateway.clientToken.generate({}, function (err, response) {
//     if (err) {
//       // Handle error
//       console.error(err);
//     } else {
//       // The client token is available in response.clientToken
//       const clientToken = response.clientToken;
//       // console.log(clientToken)
//       // Now you can pass this clientToken to your client-side code
//       return clientToken;
//     }
//   });
  
// }

// module.exports = newPlan;
