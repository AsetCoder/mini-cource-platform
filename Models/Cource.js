import mongoose from 'mongoose'


const Cource = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    video: {type: String, required: true},
    detailInfo: {type: String, required: true},
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category', requied: true},
    leanguage: {type: mongoose.Schema.Types.ObjectId, ref: 'Leanguage', requied: true},
})

export default mongoose.model('Cource', Cource)