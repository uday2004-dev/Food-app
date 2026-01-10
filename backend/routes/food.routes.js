const express=require('express')
const router=express.Router()
const foodController=require("../src/controllers/food.contoller")
const authMiddleware=require("../middlewares/auth.middleware")
const multer=require("multer")


const upload=multer({
    storage:multer.memoryStorage(),
})


// this route is protected because only foodpartner have access to add the food
// /api/food
router.post("/",
    authMiddleware.authFoodPartnerMiddleware,
    upload.single("video"),
    foodController.createFood,


)

router.get("/",
    authMiddleware.authUserMiddleware,
    foodController.getFoodItems,
    

    

)

module.exports=router;