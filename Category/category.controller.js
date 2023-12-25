import asyncHandler from 'express-async-handler'
import { validationResult } from 'express-validator'
import Category from '../Models/Category.js'



export const createCategory = asyncHandler(async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        res.status(400).json({message: 'Please check your request', errors})
    }
    const { name } = req.body
    try {
        const category = new Category({name})

        await category.save()
        res.status(200).json({category})
    } catch(error) {
        console.log(error)
        res.status(500).json({message: 'Please check your requests'})
    }
})


export const getCategories = asyncHandler(async(req, res) => {
    const categories = await Category.find()
    res.status(200).json({categories})
})


export const getCategoryById = asyncHandler(async(req, res) => {
    const { id } = req.params
    try {
        let category = await Category.findById(id)
        if(!category) {
            res.status(400).json({message: 'Category is not Found'})
        }

        category = await Category.findById(id).populate('cources')
        res.status(200).json({category})
    } catch(error) {
        console.log(error)
        res.status(500).json({message: 'Please check your requests'})
    }
})
