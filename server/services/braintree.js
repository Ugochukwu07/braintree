const braintree = require("braintree");

// Set up your Braintree credentials
const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox, // Use braintree.Environment.Production for live transactions
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY
});

exports.newPlan = (data) => {
    gateway.plan.create(data, (err, result) => {
        if (err) {
          // Handle error
          console.error(err);
          return {success: false, error: err}
        } else if (result.success) {
          // Subscription plan created successfully
          console.log("Plan created:", result.plan.id);

          return {success: true, result: result}
        //   return res.send({'result': result});
        } else {
          // Handle errors returned in the result object
          console.error(result);
          return {success: false, error: err}
        }
    });
}

exports.getAuthorization = () => {
    axios.get('http://localhost:3000/api/braintree/client/id')
    .then(function(response) {
        console.log(response)
        return {success: true, id: response.clientToken}
    }).catch(err => {
        console.log(err);
        return {success: false, error: err.message}
    })
}

exports.newClientID = async () => {
    try {
        const response = await gateway.clientToken.generate({});
        const clientToken = response.clientToken;
        // Now you can pass this clientToken to your client-side code
        return { success: true, token: clientToken };
      } catch (err) {
        // Handle error
        console.error(err);
        return { success: false, error: err };
      }
}

exports.newCustomer = async () => {
    try{
        const response = gateway.customer.create(customerData);
        console.log("Customer ID:", result.customer.id);
        console.log("Payment Method Token:", result.customer.paymentMethods[0].token);
    } catch (err) {
        // Handle error
        console.error(err);
    }
}

// module.exports = gateway;

