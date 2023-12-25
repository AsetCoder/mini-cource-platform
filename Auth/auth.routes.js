import express from 'express'
import { check } from 'express-validator'
import { authLogin, authProfile, authRegister, authUsers } from './auth.controller.js'
import { authSecurity } from '../Middlewares/Auth.js'
import { checkAdmin } from '../Middlewares/Admin.js'


const router = express.Router()

router.route('/register').post(
    [
        check('username', 'Username is required').notEmpty(),
        check('email', 'Email is required').notEmpty(),
        check('password', 'Password is not be short that then 8 words').isLength({min: 8})
    ],
    authRegister
)
router.route('/login').post(
    [
        check('email', 'Email is required').notEmpty(),
        check('password', 'Password is not be short that then 8 words').isLength({min: 8})
    ],
    authLogin
)
router.route('/profile').get(authSecurity, authProfile)
router.route('/users').get(authSecurity, checkAdmin, authUsers)

export default router