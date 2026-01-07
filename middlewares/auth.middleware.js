const foodModel = require('../src/models/food.model')
const jwt = require("jsonwebtoken");
const foodPartnerModel = require('../src/models/foodpartner.model');




async function authFoodPartnerMiddleware(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "Please login First",

        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const foodPartner = await foodPartnerModel.findById(decoded.id)
        req.foodPartner = foodPartner
        next()
    } catch (err) {
        return res.status(401).json({
            message: "Invalid Token"
        })
    }
}

module.exports = {
    authFoodPartnerMiddleware,
}