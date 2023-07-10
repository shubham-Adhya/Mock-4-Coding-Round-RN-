const express = require("express");
const cors = require('cors');
require("dotenv").config()

const { connection } = require('./connection/connection')
const { userRouter } = require("./routes/user.route")
const { restaurantRouter } = require('./routes/restaurant.route')
const { orderRouter }=require("./routes/order.route")
const app = express();
app.use(cors())
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json("Welcome to Food Delivery App Backend")
})

app.use("/api", userRouter)
app.use("/api/restaurants", restaurantRouter)
app.use("/api/orders", orderRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT, async () => {
    try {
        await connection
            .then(() => {
                console.log("Connected to MongoDB")
            })
            .then(() => {
                console.log(`Server is running at PORT ${PORT}`)
            })
            .catch((err) => {
                console.log(err)
            })
    } catch (error) {
        console.log(error)
    }
})