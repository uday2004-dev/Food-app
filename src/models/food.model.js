const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,   // ✅ required (not require)
    },
    video: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    foodPartner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "foodpartner"
    }
})

module.exports = mongoose.model("food", foodSchema)
