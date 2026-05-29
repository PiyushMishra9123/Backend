const express= require("express")
const app = express()

app.use(express.json())

app.post("/product",(req,res)=>{
    const product = req.body

    res.json({
        message:"product added",
        product : {
            name:"Laptop",
            price:50000
        }
    })
})

app.listen(5000,()=>{
    console.log("server running on port 5000");
})