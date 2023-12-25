import mongoose from "mongoose"


const User = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    vipStatus: {type: Boolean, default: false},
    isAdmin: {type: Boolean, default: false}
})


export default mongoose.model('User', User)