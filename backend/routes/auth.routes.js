const express=require('express')
const authController=require("../src/controllers/auth.controllers")
const router=express.Router()

//for user 
router.post("/user/register",authController.registerUser)
router.post("/user/login",authController.loginUser)
router.get("/user/logout",authController.logoutUser)

//for Food partner
router.post('/food-partner/register', authController.registerFoodPartner)
router.post('/food-partner/login', authController.loginFoodPartner)
router.get('/food-partner/logout', authController.logoutFoodPartner)
module.exports=router