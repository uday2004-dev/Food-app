const foodModel = require("../models/food.model")
const storageService=require("../services/storage.service")
const {v4:uuid}=require("uuid")


async function createFood(req,res) { 

    console.log(req.foodPartner)
    console.log(req.body)
    console.log(req.file)


    const fileuploadResult=await storageService.uploadFile(req.file.buffer,uuid())


    const foodItem= await foodModel.create({
        name:req.body.name,
        description:req.body.description,
        video:fileuploadResult.url,
        foodPartner:req.body.foodPartner._id
    })
    console.log(fileuploadResult)
    res.status(201).jsons({
        message:"food created successfully",
        food:foodItem,
    })
 }     
module.exports={
    createFood,    

}