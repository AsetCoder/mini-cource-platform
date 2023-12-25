import express from 'express'
import { check } from 'express-validator'
import { authSecurity } from '../Middlewares/Auth.js'
import { checkAdmin } from '../Middlewares/Admin.js'
import { createSecret, getVipStatus } from './payment.controller.js'


const router = express.Router()

router.route('/new-secret').post(
    [
        check('secretCode', 'Please put new secret code').notEmpty(),
    ],
    authSecurity, checkAdmin, createSecret
)
router.route('/pay').post(
    [
        check('secretCode', 'Please put secret code').notEmpty()
    ],
    authSecurity, getVipStatus
)


export default router