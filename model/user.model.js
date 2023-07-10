const mongoose= require("mongoose");

const userSchema=mongoose.Schema({
    name:{type: String},
    email:{type: String, unique: true},
    password: {type: String},
    address:{
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String
    }
},{
    versionKey: false,
    timestamps: true
})

const UserModel= mongoose.model("user",userSchema)

module.exports={UserModel}