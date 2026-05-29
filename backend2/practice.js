const express = require("express")
const app = express()

app.get("/products/:id",(req,res)=>{
    const Productid = req.params.id

    res.json({
        productid:Productid,
        name:"Laptop"
    })
})
app.listen(5000,()=>{
    console.log("Server running on port 5000");
    
})