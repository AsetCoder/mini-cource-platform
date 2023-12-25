import express from 'express'
import { check } from 'express-validator'
import { authSecurity } from '../Middlewares/Auth.js'
import { checkAdmin } from '../Middlewares/Admin.js'
import { createCource, deleteCource, getCourceById, getCources, updateCource, watchVideo } from './cource.controller.js'
import { checkVipStatus } from '../Middlewares/Status.js'


const router = express.Router()

router.route('/create').post(
    [
        check('name', 'Name is required').notEmpty(),
        check('description', 'Description is required and must not be long that 40 Symbols').notEmpty().isLength({max: 40}),
        check('video', 'Video is required and must be a Url').isURL(),
        check('detailInfo', 'Detail Information is required and must not be short that 10 symbols').isLength({min: 10}),
        check('category', 'Category is required').notEmpty(),
        check('leanguage', 'Leanguage is required').notEmpty(),
    ],
    authSecurity, checkAdmin, createCource
)
router.route('/:id').put(
    [
        check('name', 'Name is required').optional().notEmpty(),
        check('description', 'Description is required and must not be long that 40 Symbols').optional().notEmpty().isLength({max: 40}),
        check('video', 'Video is required and must be a Url').optional().isURL(),
        check('detailInfo', 'Detail Information is required and must not be short that 10 symbols').optional().isLength({min: 10}),
        check('category', 'Category is required').optional().notEmpty(),
        check('leanguage', 'Leanguage is required').optional().notEmpty()
    ],
    authSecurity, checkAdmin, updateCource
)
router.route('/').get(getCources)
router.route('/:id').get(getCourceById)
router.route('/:id/watch').get(authSecurity, checkVipStatus, watchVideo)
router.route('/:id').delete(authSecurity, checkAdmin, deleteCource)


export default router