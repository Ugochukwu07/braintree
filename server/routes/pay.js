const express = require('express')
const route = express.Router()

const controller = require('../controllers/braintree')


route.get('/pay', controller.payment)


route.post('/api/braintree/plan/new', controller.newPlan)
route.post('/api/braintree/customer/new', controller.createCustomer)
// route.post('/api/braintree/sub/new', braintree.newSub)
// route.get('/api/braintree/client/id', controller.newClientID)

module.exports = route;