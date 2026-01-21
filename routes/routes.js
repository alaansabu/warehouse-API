const express = require('express');
const addStock = require('../controllers/controllers') 
const Router = express.Router()

Router.post("/addStock",addStock)

module.exports = Router
