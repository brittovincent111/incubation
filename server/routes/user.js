var express = require('express');
var router = express.Router();
const User = require('../schema/User')
const register = require('../schema/Register')
let bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const multer = require("multer")
let JWT_KEY = "111"
const check = require('../middleware/auth')
// const upload = multer({ storage });


router.post('/signup',async(req,res)=>{
    
 try{

  let user = await User.findOne({email : req.body.email})
  if (user){  
    return res.json({existerror : true})
  }
    
     let password = await bcrypt.hash(req.body.password , 10)
    user = await User.create({  
      name : req.body.name,    
      email : req.body.email,
      password :password,
      phone : req.body.phone  
      
    })

  

 

  res.json({existerror : false})

 }
 catch(error){

  res.status(500).send("some error in database")
  
 }

   
})

router.post('/login' , async(req,res)=>{

  try {

    const{email,password} = req.body

    let user = await User.findOne({email})
    console.log(user)

    if (user){

      const checkPassword = await bcrypt.compare(password,user.password)

      
      if(checkPassword){
        const id=user._id
        const token=jwt.sign({id}, JWT_KEY,{
          expiresIn:"365d",

          
        })
       

        res.json({user: user, token:token, auth:true})
       res.json('Log in')
      }else {
        
        res.json( "Wrong password")

      }
    }else {

      res.json( "Email id dosenot exist")
    }
  }catch(error){
   
    console.log(error)
  }
})

const storage = multer.diskStorage({
  destination(req, file, callback) {
      callback(null, '../client/public/images');
  },
  filename(req, file, callback) {
      callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});


router.post('/',check,(req,res)=>{
 res.send({status : "ok"})
 console.log("hiiiiiiiiiiiiiiii")
})

router.get('/register',(req,res)=>{
  const cookie = req.cookies.jwt
  const decode = jwt.verify(cookie, JWT_KEY);
  console.log(decode)
  res.send('welcome to homepage')
})

router.get('/applicationForm/:id', async(req,res)=>{
  console.log('reached get application form');
  const user = req.params.id;
  let eligible = await register.findOne({userId:user,status:'pending'})
  console.log(eligible,'eli');
  if(!eligible){
      console.log('in if');
      res.status(200).json({status:true})
  }else{
      console.log('in else');
      res.status(401).json('Your application is  pending')
  }

})

router.post('/application/:id', async(req,res)=>{
  console.log('Application reached post');
  const user = req.params.id;
  console.log(user,'userrrrr');
  req.body.userId = user;
  console.log((typeof(user)));
  let eligible = await register.findOne({userId:req.params.id, status:'pending'})
  console.log(eligible,'eligibleee');
  if(eligible){
      console.log('in eligible');
  if(eligible.status !='pending'){
     register.create(req.body).then((response)=>{
          console.log(response,'9999999999999');
          res.json(response)
      }).catch((err)=>{
          res.json(err)
      })
  }else{
      console.log('heeeyy');
      res.status(401).json('jjjjjjjjj')
  }
}else{

  register.create(req.body).then((response)=>{
   console.log(response,'9999999999999');
   res.json(response)
}).catch((err)=>{
   res.json(err) 
})
}
})



module.exports = router;
