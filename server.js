import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRoutes from './Auth/auth.routes.js'
import categoryRoutes from './Category/category.routes.js'
import leanguageRoutes from './Leanguage/leanguage.routes.js'
import courceRoutes from './Cource/cource.routes.js'
import paymentRoutes from './Payment/payment.routes.js'
import 'colors'

dotenv.config()


const app = express()
const port = process.env.PORT 
const db = process.env.URL

app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/leanguage', leanguageRoutes)
app.use('/api/cource', courceRoutes)
app.use('/api/payment', paymentRoutes)


const connect = async () =>  {
    await mongoose.connect(db)
    .then(console.log('Db Connected Successsfully'.italic.bgGreen))

    app.listen(port, () => {
        console.log(`Server start on port ${port}`.italic.blue)
    })
}


connect()