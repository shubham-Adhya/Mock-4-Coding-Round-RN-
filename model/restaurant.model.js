const mongoose = require("mongoose");

const menuSchema=mongoose.Schema({
    _id: mongoose.SchemaTypes.ObjectId,
    name: String,
    description: String,
    price: Number,
    image: String
}) 

const restaurantSchema = mongoose.Schema({
    name: String,
    address: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String
    },
    menu: [menuSchema]
}, {
    versionKey: false
})

const RestaurantModel = mongoose.model("restaurant", restaurantSchema)

const MenuModel=mongoose.model("menu",menuSchema)

module.exports = { RestaurantModel, MenuModel }