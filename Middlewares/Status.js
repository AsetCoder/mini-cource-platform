import User from "../Models/User.js"


export const checkVipStatus = async (req, res, next) => {
    const userId = req.userId
    try {
        const vip = await User.findById(userId)
        if(vip.vipStatus !== true) {
            res.status(400).json({message: 'For watch this cource you need buy this'})
        }
        next()
    } catch(error) {
        console.log(error)
        res.status(500).json({message: 'Sorry Error in Middleware'})
    }
}