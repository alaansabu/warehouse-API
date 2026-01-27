const express = require('express');
const {addStock,upadateStock,putStock,delstock,staticGet} = require('../controllers/controllers') 

const Router = express.Router()

Router.post("/addStock",addStock)
Router.patch("/updateDetails/:brand",upadateStock)
Router.put('/putStock/:_id',putStock)
Router.delete('/del/:_id',delstock)
Router.get('/sget',staticGet)
module.exports = Router
