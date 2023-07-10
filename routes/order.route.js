const express = require("express");
const mongoose = require("mongoose");
const orderRouter = express.Router();

const { OrderModel } = require('../model/order.model')

const { verifyToken } = require("../middlewares/verifytoken.middleware")


orderRouter.use(verifyToken)





module.exports = { orderRouter }
