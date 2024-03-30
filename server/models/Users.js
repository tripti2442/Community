const mongoose = require('mongoose')
const UserSchema =new mongoose.Schema({
    image: String,
    caption: String,
    userId: Number,
    location: String,
})

const UserModel=mongoose.model("users",UserSchema)
module.exports = UserModel