const express = require("express")
const app = express()

app.use(express.json())

let product= [
    {
    id: 1,
    name: "Laptop"
  },
  {
    id: 2,
    name: "Mobile"
  }
]

app.get("/product",(req,res)=>{   // to get all  product 
    res.json(product)
})

app.post("/product",(req,res)=>{   // to add new product 
    const newproduct = req.body
    product.push(newproduct)
    res.json({
        message:"product added",
        product:newproduct
    })
})

app.put("/product/:id",(req,res)=>{   // to update product 
    const id = parseInt(req.params.id)
    const updateproduct = req.body
    const productindex = product.findIndex(
        (p) => p.id === id
    )
    if (productindex === -1) {
        return res.status(404).json({
            message:"Product not found"
        })
    }
    product[productindex] = updateproduct

    res.json({
        message:"product updated",
        product : updateproduct
    })
})


app.delete("/product/:id",(req,res)=>{   // to delete the product
    const id = parseInt(req.params.id)
    const productindex = product.findIndex(
        (p) => p.id === id
    )
    if (productindex === -1) {
        return res.status(404).json({
            message:"Product not found"
        })
    }
    product.splice(productindex , 1)
    res.json({
        message:"Product deleted"
    })
})

app.listen(5000,()=>{
    console.log("Server runing on port 5000"); 
})