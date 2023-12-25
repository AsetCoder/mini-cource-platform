import asyncHandler from 'express-async-handler'
import { validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
import User from '../Models/User.js'
import { generateToken } from './generatorToken.js'



export const authRegister = asyncHandler(async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Please check your requests', errors })
    }

    const { username, email, password } = req.body
    try {
        const isHave = await User.findOne({ email })
        if (isHave) {
            return res.status(400).json({ message: 'User already exists' })
        }
        let user
        const hash = bcrypt.hashSync(password, 7)
        
        if (username === 'Zulayho' && email === 'zulayho' && password === 'zulayhoo') {
            user = new User({ username, email, password: hash, isAdmin: true })
        } else {
            user = new User({ username, email, password: hash })
        }
        const token = generateToken(user.id)

        await user.save()
        if (user.isAdmin) {
            return res.status(200).json({ message: 'Welcome Admin', token })
        }

        return res.status(200).json({ message: 'User saved Successfully', token })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Sorry, an error occurred in the server' })
    }
})



export const authLogin = asyncHandler(async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Please check your requests', errors })
    }

    const { email, password } = req.body
    try {
        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({ message: 'User with this email is not authorized' })
        }

        const isPassword = bcrypt.compareSync(password, user.password)
        if (!isPassword) {
            return res.status(400).json({ message: 'Password is not correct' })
        }
        const token = generateToken(user.id)

        if (user.isAdmin) {
            return res.status(200).json({ message: 'Welcome Admin', token })
        }

        return res.status(200).json({token})
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Please check your requests' })
    }
})



export const authProfile = asyncHandler(async(req, res) => {
    const userId = req.userId
    try {
        const profile = await User.findById(userId).select('-password')
        res.status(200).json({profile})

    } catch(error) {
        console.log(error)
        res.status(500).json({message: 'Please check your requests'})
    }
})


export const authUsers = asyncHandler(async(req, res) => {
    const users = await User.find().select('-password')

    res.status(200).json({users})
})
