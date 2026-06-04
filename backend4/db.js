const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/productdb")
.then(()=>{
    console.log("MongoDb Created");
})
.catch((err)=>{
    console.log(err);
    
})