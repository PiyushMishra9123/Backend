const express = require("express")
const app = express()

// app.get("/users/:id",(req,res)=>{
//     const id = req.params.id;
//     res.json({
//         message : `User id is ${id}`
//     })
// })

app.get("/users/:id",(req,res)=>{
    const userid = req.params.id;
    res.json({
        id: userid,
        name : "billy"
    })
})

app.listen(5000,()=>{
    console.log("server is running at port 5000");
    
})