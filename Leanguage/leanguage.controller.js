import asyncHandler from 'express-async-handler'
import { validationResult } from 'express-validator'
import Leanguage from '../Models/Leanguage.js'



export const createLeanguage = asyncHandler(async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        res.status(400).json({message: 'Please check your request', errors})
    }
    const { name } = req.body
    try {
        const leanguage = new Leanguage({name})

        await leanguage.save()
        res.status(200).json({leanguage})
    } catch(error) {
        console.log(error)
        res.status(500).json({message: 'Please check your requests'})
    }
})


export const getLeanguages = asyncHandler(async(req, res) => {
    const leanguages = await Leanguage.find()
    res.status(200).json({leanguages})
})


export const getLeanguageById = asyncHandler(async(req, res) => {
    const { id } = req.params
    try {
        const isLeanguage = await Leanguage.findById(id).populate('cources')
        if(!isLeanguage) {
            res.status(400).json({message: 'Leanguage is not Found'})
        }
        res.status(200).json({isLeanguage})
    } catch(error) {
        console.log(error)
        res.status(500).json({message: 'Please check your requests'})
    }
})
