import express from 'express'
import { check } from 'express-validator'
import { createCategory, getCategories, getCategoryById } from './category.controller.js'
import { authSecurity } from '../Middlewares/Auth.js'
import { checkAdmin } from '../Middlewares/Admin.js'


const router = express.Router()

router.route('/create').post(
    [
        check('name', 'Name is required').notEmpty()
    ],
    authSecurity, checkAdmin, createCategory
)
router.route('/').get(getCategories)
router.route('/:id').get(getCategoryById)

export default router
