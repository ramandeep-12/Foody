const express = require("express")
const router = express.Router()
const user = require("../models/User");
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const{body,validationResult}=require("express-validator")

router.post("/createuser", [body('email').isEmail()],async (req, res) => {
    const { username, email, password, cpassword,location } = req.body;

    if (!username || !email || !password || !cpassword || !location) {
        return res.status(404).json({ error: "please fill the details" })
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({errors:"incorrect credentials"});
    }
    try {
        const userexit = await user.findOne({ email: email })
        if (userexit) {
            return res.status(404).json({ error: "Already Registered" })
        }
        else if (password != cpassword) {
            return res.status(404).json({ error: "password mismatched" })
        }
        else {
            const u = new user(req.body);
            // const user=new s({username,email,phone,work,password,cpassword});
            await u.save();
            res.status(201).json({ success:true });
        }
    }
    catch (err) {
        console.log(err)
    }
})


//login

// router.post("/login",async (req, res) => {
//     const {email, password} = req.body;
//     try{
//     const userlogin = await user.findOne({ email: email });

//     if(!userlogin){
//         return res.status(400).json({errors:"invalid"})
//     }
//     if(password!==userlogin.password){
//         return res.status(400).json({errors:"invalid"})
//     }
//     else{
//     return res.json({success:true})
//     }
//     }
//     catch(error){
//         // res.json({success:false})
//         console.log(error)
//     }
// }
// )




router.post("/login", async (req, res) => {


    try {
        // let token;
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: "plz fill the data" });
        }


        const userlogin = await user.findOne({ email: email });

        if (userlogin) {

            const ismatch = await bcrypt.compare(password, userlogin.password);
            console.log(ismatch);
            if (!ismatch) {
                res.status(400).send({ error: "invalid credentials" })

            }
            else {
                const data={
                    user:{
                        id:userlogin.id
                    }
                }
                const authtoken=jwt.sign(data,process.env.SECRET)
                res.json({ message: "user sign in successfully",authtoken:authtoken });

            }
        }

        else {
            res.json({ message: "invalid cedentials1" });
        }
    }
    catch (err) {
        console.log(err);
    }
})
module.exports = router