const express = require('express')
const multer = require("multer")

const authMiddleware = require("../middlewares/auth.middleware")
const router = express.Router()
const foodController = require("../src/controllers/food.contoller")

const upload = multer({
    storage: multer.memoryStorage(),
})

//api/food. it is need to be protected
router.post("/", 
    authMiddleware.authFoodPartnerMiddleware, 
    upload.single("video"), 
    foodController.createFood)

    // router.get("/",
    //     authMiddleware.authUserMiddleware,
    //     foodController.getFoodItems,

    
    // )

module.exports = router;
