// const foodModel = require("../models/food.model")
// const storageService=require("../services/storage.service")
// const {v4:uuid}=require("uuid")


// async function createFood(req,res) { 

//     console.log(req.foodPartner)
//     console.log(req.body)
//     console.log(req.file)


//     const fileuploadResult=await storageService.uploadFile(req.file.buffer,uuid())


//     const foodItem= await foodModel.create({
//         name:req.body.name,
//         description:req.body.description,
//         video:fileuploadResult.url,
//    foodPartner: req.foodPartner._id // ✅ FIX
//     })
//     console.log(fileuploadResult)
//     res.status(201).jsons({
//         message:"food created successfully",
//         food:foodItem,
//     })
//  }    



//  async function getFoodItems(req, res) {
//     const foodItems = await foodModel.find({})
//     res.status(200).json({
//         message: "Food items fetched successfully",
//         foodItems
//     })
// } 
// module.exports={
//     createFood, 
//     getFoodItems,   

// }


// const foodModel = require("../models/food.model");
// const storageService = require("../services/storage.service");
// const { v4: uuid } = require("uuid");

// async function createFood(req, res) {
//   try {
//     // SAFETY CHECK
//     if (!req.file) {
//       return res.status(400).json({
//         message: "Video file is required"
//       });
//     }

//     const fileuploadResult = await storageService.uploadFile(
//       req.file.buffer,
//       uuid()
//     );

//     const foodItem = await foodModel.create({
//       name: req.body.name,
//       description: req.body.description,
//       video: fileuploadResult.url,
//       foodPartner: req.foodPartner._id // ✅ FIX
//     });

//     res.status(201).json({ // ✅ FIX
//       message: "Food created successfully",
//       food: foodItem
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       message: "Something went wrong"
//     });
//   }
// }

// async function getFoodItems(req, res) {
//   const foodItems = await foodModel.find({});
//   res.status(200).json({
//     message: "Food items fetched successfully",
//     foodItems
//   });
// }
const foodModel = require('../models/food.model');
const storageService = require('../services/storage.service');
// const likeModel = require("../models/likes.model")
// const saveModel = require("../models/save.model")
// const { v4: uuid } = require("uuid")


async function createFood(req, res) {
    console.log(req.foodPartner)
    res.send("food item created")

}



module.exports = {
  createFood,

};
