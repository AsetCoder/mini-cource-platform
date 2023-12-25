import asyncHandler from 'express-async-handler'
import { validationResult } from 'express-validator'
import Seceret from '../Models/Secret.js'
import User from '../Models/User.js'
import bcrypt from 'bcrypt'


export const createSecret = asyncHandler(async(req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ message: 'Please check your requests', errors })
    }
    const { secretCode } = req.body
    try {
        const hash = bcrypt.hashSync(secretCode, 7)
        const secret = new Seceret({secretCode: hash})
        
        await secret.save()
        res.status(200).json({message: 'Secret code created Successfully'})
    } catch(error) {
        console.log(error)
        res.status(500).json({message: 'Please check your requests'})
    }
})


export const getVipStatus = asyncHandler(async(req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ message: 'Please check your requests', errors })
    }
    const userId = req.userId
    const { secretCode } = req.body
    try {
        const user = await User.findById(userId)
        const secret = await Seceret.findOne()
        if(!secret) {
            res.status(400).json({message: 'Secret '})
        }
        const isSecret = bcrypt.compareSync(secretCode, secret.secretCode)
        if(!isSecret) {
            res.status(400).json({message: 'Secret code is not correct'})
        }
        user.vipStatus = true
        await user.save()

        res.status(200).json({user})
    } catch(error) {
        console.log(error)
        res.status(500).json({message: 'Please check your requests'})
    }
})
