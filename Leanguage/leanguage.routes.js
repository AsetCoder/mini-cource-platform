import express from 'express'
import { check } from 'express-validator'
import { createLeanguage, getLeanguageById, getLeanguages } from './leanguage.controller.js'
import { checkAdmin } from '../Middlewares/Admin.js'
import { authSecurity } from '../Middlewares/Auth.js'


const router = express.Router()

router.route('/create').post(
    [
        check('name', 'Name is required').notEmpty()
    ],
    authSecurity, checkAdmin, createLeanguage
)
router.route('/').get(getLeanguages)
router.route('/:id').get(getLeanguageById)


export default router
