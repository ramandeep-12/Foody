const mongoose=require("mongoose")
const dotenv=require("dotenv")
dotenv.config()
const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true})
        console.log(`mongoDb connected: ${conn.connection.host}`)
        const fetchedData=await mongoose.connection.db.collection("food_items")
        const ans=await fetchedData.find({}).toArray(async(err,data)=>{
            // const foodCategory=await mongoose.connection.db.collection("food_category")
            console.log(global.category)
            if(err)console.log(err)
            else console.log(data)
        })

        // console.log(ans)
        global.food=ans
        const foodCategory=await mongoose.connection.db.collection("food_category")

        const ans1=await foodCategory.find({}).toArray(async(err,data)=>{
            if(err)console.log(err)
        else console.log(data)
        })
        global.category=ans1

        // console.log(global.food)

    }

    catch(err){
        console.log(`error ${err}`)
    }
}
    
module.exports=connectDB;