const userController = require('./userController');
const express = require('express');
const Router = express.Router();

Router.post('/create',userController.create);
Router.put('/update/:_id',userController.update);
Router.get('/findusers',userController.findAll_users);
Router.get('/findone/:_id',userController.findOne);
Router.post('/login',userController.login);
module.exports = Router