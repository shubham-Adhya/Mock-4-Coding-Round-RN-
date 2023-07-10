const mongoose = require("mongoose");

const itemsSchema=mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number
})
const orderSchema = mongoose.Schema({
    user: { type: mongoose.SchemaTypes.ObjectId, ref: 'user' },
    restaurant: { type: mongoose.SchemaTypes.ObjectId, ref: 'restaurant' },
    items: [itemsSchema],
    totalPrice: Number,
    deliveryAddress: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String
    },
    status: {
        type: String,
        enum: ["placed", "preparing", "on the way","delivered"]
    }
}, {
    versionKey: false
})

const OrderModel = mongoose.model("order", orderSchema)

module.exports = { OrderModel }