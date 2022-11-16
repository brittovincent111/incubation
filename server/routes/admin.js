const express = require('express')
const router = express.Router()
const jwt= require('jsonwebtoken')
const bcyrpt = require('bcrypt')
const applicationForm = require('../schema/Register')
const slotBooking = require('../schema/SlotSchema')

let ADMIN_EMAIL  = "brittovincent@gmail.com"
let ADMIN_PWD = "123456"
let JWT_KEY = " 111"


router.post('/login',(req,res)=>{
    try {

        // const {ADMIN_EMAIL,ADMIN_PWD}=process.env
        const {email,password}= req.body
        if(email===ADMIN_EMAIL){
            if(password===ADMIN_PWD){
                const id='8394n43x14n384n1njk'
                const token=jwt.sign({id}, JWT_KEY,{
                    expiresIn:"365d",
                })


                console.log("kjhkh");
                console.log(token);

                res.json({admin: true, token:token, auth:true})

            
        }else{
            res.json('Incorrect Password')
        }
    }else{
        res.json('Incorrect email id')
    }
        
    } catch (error) {
        
    }
})



router.get('/app', (req, res) => {
  console.log("fsdfsdfsdfsdfsdfsdf")
  applicationForm.find({status:"pending"}).then((data)=>{
    console.log(data);
    res.json(data);
 }).catch(()=>{
    let err='Something went wrong!'
    res.json({err:err});
 })
 })

    
router.post('/approve/:id', async (req, res) => {
    try {
         await applicationForm.findByIdAndUpdate({ _id: req.params.id }, {
            $set: {
                status: "approved"
            }
        }).then(response => {
            if (response) res.status(200).json({ update: true })
        }).catch(error => {
            res.json(error)
        })
    } catch (error) {
        console.log(error);
    }
})

   router.post('/reject/:id', async (req, res) => {
    try {
        await applicationForm.findByIdAndUpdate({ _id: req.params.id }, {
            $set: {
                status: "rejected"
            }
        }).then(response => {
            console.log(response)
            if (response) res.status(200).json({ update: true })
        }).catch(error => {
            res.json(error)
        })
    } catch (error) {
        console.log(error);
    }
})

router.get('/approved', async (req, res) => {
    try {
        applicationForm.find({ status: "approved" }).then(response => {
            // console.log("lklkk");
            console.log(response);
            res.status(200).json(response)
        }).catch(error => {
            res.json(error)
        })
    } catch (error) {
        console.log(error);
    }
})

router.get('/rejected', async (req, res) => {
    try {
        applicationForm.find({ status: "rejected" }).then(response => {
            // console.log("lklkkopopo");
            // console.log(response);
            res.status(200).json(response)
        }).catch(error => {
            res.json(error)
        })
    } catch (error) {
        // console.log(error);
    }
})


// create slots
router.post('/createslot',async(req,res)=>{

    try {
    
        console.log("slookoo");
    
        const createslot = new slotBooking({
            bookedId: req.body.bookedId,
            slotNo: req.body.sloatNo,
    
        })
         await createslot.save()
         res.status(200).json({res:createslot})
        
    } catch (error) {
        console.log('error reached')
        console.log(error);
    }
    })
// slot booking

router.get('/slots',async(req,res)=>{
    try {
        slotBooking.find().then(response => {
            res.status(200).json(response)
            console.log(response)

        }).catch(error => {
            res.json(error)
        })
    } catch (error) {
        // console.log(error);
    }
})


router.get('/slotBooking', async (req, res) => {
    try {
        applicationForm.findOneAndUpdate({ _id: req.query.companyId }, {
            $set: {
                status: "Booked"
            }
        }).then(response => {
            if (response) {
                slotBooking.findOneAndUpdate({ slotNo: req.query.slotId }, {
                    $set: {
                        "bookedId": req.query.companyId,
                        "status": true
                    }
                }).then(response => {
                    console.log("REACHED")
                    res.status(200).json(response)
                }).catch(error => res.json(error))
            }
        }).catch(error => res.json(error))


    } catch (error) {
        console.log(error);
    }
})


router.get('/progress', (req,res)=>{
    try {
        applicationForm.find().then(response => {
            res.status(200).json(response)
        }).catch(error => {
            res.json(error)
        })
    } catch (error) {
        console.log(error);
    }
}
)

module.exports = router;
