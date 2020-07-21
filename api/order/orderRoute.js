const orderController = require('./orderController');
const express = require('express');
const Router = express.Router();

Router.post('/add',orderController.create);
Router.get('/find/:page',orderController.findAll_orders);
Router.put('/cancel_order/:_id',orderController.cancel_order);
module.exports = Router