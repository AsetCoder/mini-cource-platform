import mongoose from 'mongoose'


const Leanguage = new mongoose.Schema({
    name: {type: String, required: true},
    courcesCount: {type: Number, default: 0},
    cources: [{type: mongoose.Schema.Types.ObjectId, ref: 'Cource'}]
})

export default mongoose.model('Leanguage', Leanguage)