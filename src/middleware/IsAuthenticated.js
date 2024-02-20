const {User}=require("../database/models")
const isAuthenticated=(req,res,next)=>{
const jwt = require('jsonwebtoken')
    
    const token=req.headers.authorization;

    if(!token){
        return res.status(401).json({
            message:"token is required"
        })
    }
     //decoding token
     jwt.verify(token,process.env.JWT_SECRET,async(error,decodedTOken)=>{

        //return a message to user if any error

        if(error){
            return res.status(401).json({
                message:"token is invalid or expired"
            });   

        }
      //find a user whose id and email is equal to the one stored in database
      const user= await User.findOne({
        where:{id:decodedTOken.id,email:decodedTOken.email},
      });
      console.log(user)
      
      });
 };
    




        
       

module.exports=isAuthenticated