const express = require("express")
require("./db")
const app = express()

app.use("/",(req,res)=>{
    res.json({
        message: "Server Started Successfully"
    })
})

app.listen(5000,()=>{
    console.log("Server runing on port 5000");
})