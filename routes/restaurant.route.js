const express = require("express");
const mongoose = require("mongoose");
const restaurantRouter = express.Router();

const { RestaurantModel, MenuModel } = require('../model/restaurant.model')

const { verifyToken } = require("../middlewares/verifytoken.middleware")


restaurantRouter.use(verifyToken)


restaurantRouter.get("/:id", async (req, res) => {
    const { id } = req.params
    if (id) {
        const restaurant = await RestaurantModel.findOne({ _id: id })
        return res.status(200).json(restaurant)
    } 
})
restaurantRouter.get("/", async (req, res) => {

    const restaurants = await RestaurantModel.find()
    return res.status(200).json(restaurants)

})

restaurantRouter.get("/:id/menu",async(req,res)=>{
    const { id } = req.params
    if (id) {
        const restaurant = await RestaurantModel.findOne({ _id: id })
        return res.status(200).json({menu: restaurant.menu})
    }else{
        res.status(500).json({ message: "Invalid Request" })
    }
})

restaurantRouter.post("/:id/menu", async(req, res) => {
    const { id } = req.params
    const {name, description, price, image}=req.body
    if (id && name && description && price && image){
        const newMenu = new MenuModel({
            name, description, price, image,
            _id: new mongoose.mongo.ObjectId()
        })
        await RestaurantModel.findOneAndUpdate(
            { _id: id },
            { $push: { menu: newMenu } }
        )
        .then(()=>{
            return res.status(201).json({message: "New Menu Item Added"})
        })
    }else{
        res.status(500).json({message: "Invalid Request"})
    }
})

restaurantRouter.delete("/:id/menu/:menuid", async(req, res) => {
    const { id, menuid } = req.params
    if (id){
        await RestaurantModel.updateOne(
            { _id: id },
            {$pull : { menu: {_id: menuid} } }
        ).then(() => {
            return res.status(202).json({ message: "Menu Item Deleted" })
        })
    }else{
        res.status(500).json({message: "Invalid Request"})
    }
})

module.exports = { restaurantRouter }
