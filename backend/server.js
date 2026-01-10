require('dotenv').config()   // ✅ FIRST LINE (MOST IMPORTANT)

const app = require("./src/app")
const connectDB = require("./src/db")

connectDB()

app.get('/', (req, res) => {
    res.send("Hello world")
})

app.listen(3000, () => {
    console.log("server is running")
})
