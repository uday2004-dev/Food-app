const foodPartnerModel = require("../src/models/foodpartner.model");
const jwt = require('jsonwebtoken')
const userModel=require("../src/models/user.model")

async function authFoodPartnerMiddleware(req, res, next) {

    // const token = req.cookies.token;
    const token = req.cookies.foodpartner_token;
    if (!token) {
        return res.status(401).json({
            message: "Please login first"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const foodPartner = await foodPartnerModel.findById(decoded.id)
        req.foodPartner = foodPartner
        next()

    } catch (err) {
        return res.status(401).json({
            message: "Invalid token"
        })

    }

}


async function authUserMiddleware(req, res, next) {
  const token = req.cookies.user_token;

  if (!token) {
    return res.status(401).json({
      message: "Please login first",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id); // ✅ FIX

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
}

module.exports = {
    authFoodPartnerMiddleware,
    authUserMiddleware,
}