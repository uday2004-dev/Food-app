// // const express=require('express')
// const userModel = require("../models/user.model")
// const bcrypt = require('bcryptjs')
// const jwt = require("jsonwebtoken")
// const foodPartnerModel = require("../models/foodpartner.model");





// async function registerUser(req, res) {

//     const { fullName, email, password } = req.body;

//     const isUserAlreadExits = await userModel.findOne({
//         email
//     })
//     if (isUserAlreadExits) {
//         res.status(400).json({
//             message: "user already exits"
//         })
//     }
//     const hasedPassword = await bcrypt.hash(password, 10);
//     const user = await userModel.create({
//         fullName,
//         email,
//         password: hasedPassword
//     })

//     const token = jwt.sign({
//         id: user._id,

//     }, process.env.JWT_SECRET)
//     res.cookie('token', token)
//     res.status(201).json({
//         message: "User Registeres Succesfully",
//         user: {
//             _id: user._id,
//             fullName: user.fullName,
//             email: user.email,
//         }
//     })
// }

// async function loginUser(req, res) {
//     const { email, password } = req.body;
//     const user = await userModel.findOne({
//         email
//     })
//     if (!user) {
//         return res.status(404).json({
//             message: "Invalid or password"
//         })
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//         return res.status(400).json({
//             message: "invalid email or password"
//         })
//     }
//     const token = jwt.sign({
//         id: user._id,

//     }, process.env.JWT_SECRET)
//     res.cookie("token", token)
//     res.status(200).json({
//         message: "User Logedin successfully",
//         user: {
//             _id: user._id,
//             fullName: user.fullName,
//             email: user.email,
//         }
//     })
// }

// async function logoutUser(req, res) {
//     res.clearCookie("token");
//     res.status(200).json({
//         message: "User logout successfully"
//     })

// }




// async function registerFoodPartner(req, res) {
//     const { name, email, password } = req.body;

 
//     const isAccountAlreadyExists = await foodPartnerModel.findOne({ email })
//     if (isAccountAlreadyExists) {
//         return res.status(400).json({
//             message: "Food partner already exists"
//         })
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);


//     const foodPartner = await foodPartnerModel.create({
//         name,
//         email,
//         password: hashedPassword
//     })

//     const token = jwt.sign({
//           id: foodPartner._id 
//     },
       
//         process.env.JWT_SECRET
//     )

//     res.cookie("token", token)

//     res.status(201).json({
//         message: "Food partner registered successfully",
//         foodPartner: {
//             _id: foodPartner._id,
//             name: foodPartner.name,
//             email: foodPartner.email
//         }
//     })
// }


// async function loginFoodPartner(req, res) {

//     const { email, password } = req.body;

//     const foodPartner = await foodPartnerModel.findOne({
//         email
//     })

//     if (!foodPartner) {
//         return res.status(400).json({
//             message: "Invalid email or password"
//         })
//     }

//     const isPasswordValid = await bcrypt.compare(password, foodPartner.password);

//     if (!isPasswordValid) {
//         return res.status(400).json({
//             message: "Invalid email or password"
//         })
//     }

//         const token = jwt.sign({
//             id: foodPartner._id,
//         }, process.env.JWT_SECRET)

//         res.cookie("token", token)

//     res.status(200).json({
//         message: "Food partner logged in successfully",
//         foodPartner: {
//             _id: foodPartner._id,
//             email: foodPartner.email,
//             name: foodPartner.name
//         }
//     })
// }
// function logoutFoodPartner(req, res) {
//     res.clearCookie("token");
//     res.status(200).json({
//         message: "Food partner logged out successfully"
//     });
// }


// module.exports = {
//     registerUser,
//     loginUser,
//     logoutUser,

//     registerFoodPartner,
//     loginFoodPartner,
//     logoutFoodPartner,

// }


const userModel = require("../models/user.model");
const foodPartnerModel = require("../models/foodpartner.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* ================= USER ================= */

async function registerUser(req, res) {
  const { fullName, email, password } = req.body;

  const exists = await userModel.findOne({ email });
  if (exists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    fullName,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    { id: user._id, role: "user" },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("user_token", token, { httpOnly: true });

  res.status(201).json({
    message: "User registered successfully",
    user,
  });
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign(
    { id: user._id, role: "user" },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("user_token", token, { httpOnly: true });

  res.status(200).json({ message: "User logged in successfully" });
}

function logoutUser(req, res) {
  res.clearCookie("user_token");
  res.status(200).json({ message: "User logged out" });
}


async function registerFoodPartner(req, res) {
  const { name, email, password } = req.body;

  const exists = await foodPartnerModel.findOne({ email });
  if (exists) {
    return res.status(400).json({ message: "Food partner already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const foodPartner = await foodPartnerModel.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    { id: foodPartner._id, role: "foodPartner" },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("foodpartner_token", token, { httpOnly: true });

  res.status(201).json({
    message: "Food partner registered successfully",
     foodPartner: {
            _id: foodPartner._id,
            name: foodPartner.name,
            email: foodPartner.email
        }
  });
}

async function loginFoodPartner(req, res) {
  const { email, password } = req.body;

  const foodPartner = await foodPartnerModel.findOne({ email });
  if (!foodPartner) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const isValid = await bcrypt.compare(password, foodPartner.password);
  if (!isValid) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign(
    { id: foodPartner._id, role: "foodPartner" },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("foodpartner_token", token, { httpOnly: true });

  res.status(200).json({ message: "Food partner logged in successfully" });
}

function logoutFoodPartner(req, res) {
  res.clearCookie("foodpartner_token");
  res.status(200).json({ message: "Food partner logged out" });
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner,
};

