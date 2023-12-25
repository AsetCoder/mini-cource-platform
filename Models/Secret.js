import mongoose from "mongoose"


const Secret = new mongoose.Schema({
    secretCode: {type: String, required: true}
})

export default mongoose.model('Secret-Codes', Secret)
