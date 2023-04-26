const express=require("express")
const mongodb=require('./db/conn')
mongodb()
const app=express()
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept")
        next()
})
app.use(express.json())
const port=5000
app.get('/',(req,res)=>{
    res.send('Heeloo word')
})
app.use(express.json())
app.use('/api',require("./Routes/CreateUser"))
app.use('/api',require("./Routes/Display"))
app.use('/api',require("./Routes/OrderData"))


app.listen(port,()=>{
    console.log(`example hioo jijop ${port} `)
})