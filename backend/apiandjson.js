const express = require("express")
const app = express()

app.get("/",(req,res)=>{
    res.json({
        message : "Backend Started",
        success : true
    })
})

app.get("/users",(req,res)=>{
    const user = [
        {
            id : 1,
            name : "Butcher"
        },
        {
            id : 2,
            name : "Billy"
        },
        {
            id : 3,
            name : "Hughie"
        },
    ]
    res.json(user)
})
// practice
app.get("/products",(req,res)=>{
    const products = [
        {
            id : 1,
            name : "Laptop"
        },
        {
            id : 2,
            name : "Mobile"
        },
    ]
    res.json(products)
})

app.listen(5000,()=>{
    console.log("Server running on port 5000");
})