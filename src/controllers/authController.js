const bcrypt = require("bcrypt");
const jwt =require("jsonwebtoken");

const {User} =require("../database/models");

const login=async(req,res)=>{
     //get email and password from the body
     const {email,password}=req.body;

     //conditions
     if (!email || !password){
        return res.status(401).json({
            message:"Email and password are required",

        });
     }

     //check if user exists
     const user = await User.findOne({where:{email}});
     if (!user){
        return res.status(401).json({
            message:`User with ${email} does not exist`,
        });
    
     }

     //compare passwords
     const comparePassword=bcrypt.compareSync(password,user.password);

     if(!comparePassword){
        return res.status(401).json({
      message:"invalid credentials",
        });
     }

     //generate token
     const payload={
        id:user.id,
        email:user.email,
     };
     const generatedToken=jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:process.env.EXPIRES_IN
     });

     return res.status(200).json({
        token:generatedToken,
     });
};
module.exports={login};