const express = require("express")
const app = express()
app.get("/",(req,res)=>{
    res.send("Server Started  🚀")
})
app.get("/about",(req,res)=>{
    res.send("About Page")
})

app.listen(5000, () =>{
    console.log("Server running on port 5000");
    
})