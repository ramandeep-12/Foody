const express = require("express")
const router = express.Router()
router.post("/food",(req,res)=>{
    try{
        res.send([global.food,global.category])

    }
    catch(err){
        console.log(`error ${err}`)
    }
})
module.exports=router