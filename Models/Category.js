import mongoose from 'mongoose'
import Cource from './Cource.js'


const Category = new mongoose.Schema({
    name: {type: String, required: true},
    courcesCount: {type: Number, default: 0},
    cources: [{type: mongoose.Schema.Types.ObjectId, ref: 'Cource'}]
})

export default mongoose.model('Category', Category)
