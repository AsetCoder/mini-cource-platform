import asyncHandler from 'express-async-handler'
import { validationResult } from 'express-validator'
import Category from '../Models/Category.js'
import Leanguage from '../Models/Leanguage.js'
import Cource from '../Models/Cource.js'



export const createCource = asyncHandler(async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        res.status(400).json({message: 'Please check your request', errors})
    }
    const { name, description, video, detailInfo, category, leanguage } = req.body
    try {
        let isCategory = await Category.findOne({name: category})
        if(!isCategory) {
            isCategory = new Category({name: category})
            await isCategory.save()
        }
        isCategory.courcesCount += 1

        let isLeanguage = await Leanguage.findOne({name: leanguage})
        if(!isLeanguage) {
            isLeanguage = new Leanguage({name: leanguage})
            await isLeanguage.save()
        }
        isLeanguage.courcesCount += 1

        const cource = new Cource({name, description, video, detailInfo, category: isCategory, leanguage: isLeanguage})
        await cource.save()

        isLeanguage.cources.push(cource._id)
        await isLeanguage.save()

        isCategory.cources.push(cource._id)
        await isCategory.save()

        res.status(200).json({message: 'Cource created Successfully', cource})
    } catch(error) {
        console.log(error)
        res.status(500).json({message: 'Sorry Error in Server'})
    }
})


export const updateCource = asyncHandler(async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        res.status(400).json({message: 'Please check your request', errors})
    }
    const { id } = req.params
    try {
        let cource = await Cource.findById(id)
        if(!cource) {
            res.status(400).json({message: 'Cource is not Found'})
        }
        cource = await Cource.findByIdAndUpdate(id, {
            $set: req.body
        },{new: true})

        await cource.save()
        res.status(200).json({message: 'Cource updated successfully'})
    } catch(error) {
        console.log(error)
        res.status(500).json({message: 'Sorry Error in Server'})
    }
})


export const deleteCource = asyncHandler(async(req, res) => {
    const { id } = req.params
    try {
        let cource = await Cource.findById(id)
        const category = await Category.findOne()
        const leanguage = await Leanguage.findOne()
        if(!cource) {
            res.status(400).json({message: 'Cource is not Defind'})
        }
        cource = await Cource.findByIdAndDelete(id)

        const removeFromCategory = category.cources.indexOf(id)
        if (removeFromCategory !== -1) {
        category.courcesCount -= 1
        category.cources.splice(removeFromCategory, 1)
        await category.save()
        }

        const removeFromLeanguage = leanguage.cources.indexOf(id)
        if (removeFromLeanguage !== -1) {
        leanguage.courcesCount -= 1
        leanguage.cources.splice(removeFromLeanguage, 1)
        await leanguage.save()
        }

        res.status(200).json({message: 'Cource deleted Successfully'})
    } catch(error) {
        console.log(error)
        res.status(500).json({message: 'Sorry Error in Server'})
    }
}) 


export const getCources = asyncHandler(async(req, res) => {
    const cources = await Cource.find().select('-detailInfo -video')
    res.status(200).json({cources})
})


export const getCourceById = asyncHandler(async(req, res) => {
    const { id } = req.params
    try {
        const cource = await Cource.findById(id).select('-video')
        if(!cource) {
            res.status(400).json({message: 'Cource is not Foound'})
        }
        res.status(200).json({cource})
    } catch(error) {
        console.log(error)
        res.status(500).json({message: 'Sorry Error in Server'})
    }
})


export const watchVideo = asyncHandler(async(req, res) => {
    const { id } = req.params
    try {
        const cource = await Cource.findById(id)
        const video = cource.video
        if(!video) {
            res.status(400).json({message: 'Video Link is not found'})
        }

        res.status(200).json({video})
    } catch(error) {
        console.log(error)
        res.status(500).json({message: 'Sorry Error in Server'})
    }
})
