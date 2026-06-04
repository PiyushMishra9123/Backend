const express = require("express")
require("./db")
const product = require("./models/Product")
const app = express()

app.use(express.json())

app.get("/product", async (req,res) => {   // to get all product
    try {
        const products = await product.find()
        res.json(products)
    } catch (err) {
        res.status(500).json({
            message : err.message
        })
    }
})

app.post("/product", async (req,res) => {    // to add the product
    try {
        const Product = await product.create(req.body)

        res.json({
            message: "product added",
            Product
        })
    } catch (err) {
        res.status(500).json({
            message : err.message
        })
    }
})


app.put("/product/:id", async (req,res) => {    // to update the product 
    try {
        const Product = await product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        )
        if (!Product) {
            return res.status(404).json({
                message: "product not found"
            })
        }
        res.json({
            message : "producted updated",
            Product
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

app.delete("/product/:id" , async (req,res)=>{   // to delete the product 
    try {
        const Product = await product.findByIdAndDelete(
            req.params.id
        )
        if (!Product) {
            return res.status(404).json({
                message : "product not found"
            })
        }
        res.json({
            message : "product Deleted" 
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

app.listen(5000,()=>{
    console.log("Server runing on port 5000");
    
})