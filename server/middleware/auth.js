const jwt = require('jsonwebtoken')
let JWT_KEY = "111"


const check = (req,res,next)=>{

    try{
     
        const token =req.body.jwt
        
        console.log(token)
        const user =jwt.verify(token,JWT_KEY)
        if(user){

            req.user = user
            next()
        }else{
            res.send({status:"errors" , data : "no user"})
        }

    }catch(error){

        console.log(error.message);
        res.send({status:"errors" , data : error.message})



    }
}

module.exports= check;