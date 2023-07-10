const express = require("express");
const userRouter = express.Router();

const bcrypt = require("bcrypt")
const jwt=require("jsonwebtoken")

const { UserModel } = require('../model/user.model');

userRouter.post("/register", (req, res) => {
    const { name, email, password, address } = req.body
    if (!name || !email || !password || !address) {
        return res.status(400).json({ message: "Missing Required Fields" })
    }
    bcrypt.hash(password, +process.env.SaltRounds, async (err, hash) => {
        if (err) {
            return res.status(400).json({ message: "Something went wrong" })
        }
        try {
            const user = new UserModel({
                name, email, password: hash, address
            })
            user.save();
            return res.status(201).json({message: "New user registered"})
        } catch (error) {
            console.log(error)
        }
        
    })
})

userRouter.post("/login",async(req,res)=>{
    const {email, password}=req.body
    if(!email || !password){
        return res.status(400).json({ message: "Missing Required Fields" })
    }
    try {
        const user=await UserModel.findOne({email});
        if(!user){
            return res.status(404).json({ message: "User not found" })
        }
        bcrypt.compare(password, user.password, async(err, result)=>{
            if(err){
                return res.status(400).json({ message: "Something went wrong" })
            }
            if(result){
                const {name,email,address, _id}=user

                jwt.sign({ name, email, address, _id },process.env.JWT_secret,(err,token)=>{
                    if(err){
                        throw err
                    }else{
                        return res.status(201).json
                        ({message: "Login success",
                        user:{name, email, address, _id},
                        token
                        })
                    }
                })
            }else{
                return res.status(400).json({ message: "Wrong Password" })
            }
        })
    } catch (error) {
        console.log(error)
    }
})

userRouter.patch("/user/:id/reset", async(req,res)=>{
    const {id}=req.params;
    const {password, newPassword}=req.body
    
    try {
        const user = await UserModel.findOne({ _id: id });
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        bcrypt.compare(password, user.password, async (err, result) => {
            if (err) {
                return res.status(400).json({ message: "Something went wrong" })
            }
            if (result) {
                const hashpass = bcrypt.hashSync(newPassword, +process.env.SaltRounds)
                await UserModel.findOneAndUpdate({ _id: id },{password: hashpass})
                    .then(()=>{
                        return res.status(204).json({
                            message: "Password updated"
                        })
                    })
                    .catch(()=>{
                        return res.status(400).json({ message: "Something went wrong" })
                    })
            } else {
                return res.status(400).json({ message: "Wrong Password" })
            }
        })
    } catch (error) {
        console.log(error)
    }
})
module.exports = { userRouter }