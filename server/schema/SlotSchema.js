const mongoose = require('mongoose')

const slotBooking = new mongoose.Schema({
    slotNo : {
        type : String,
        required : true
    } ,
    status : {
        type : Boolean,
        default : false,
        required : true
    },
    bookedId : {
        type : String,
        required : true
    }
})

const SlotBooking = mongoose.model('slots', slotBooking)

module.exports = SlotBooking