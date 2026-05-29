const express = require("express")
const app = express()

app.use(express.json())

app.post("/users",(req,res)=>{
    const user = req.body

    res.json({
         message: "User received successfully",
          user: {
            name:"piyush",
             age:23
          } 
    })
})

app.listen(5000,()=>{
    console.log("server running on port 5000");
    
})