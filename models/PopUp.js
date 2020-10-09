const mongoose = require('mongoose');

const popupSchema = mongoose.Schema({
    shop:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Shop'
    },
    popImage:{
        type:Array,
        default:[]
    },
    popHeading:{
        type:String,
    },
    popContent:{
        type:String,
    },
    testButton:{
        type:String,
        defauly:"Subscribe"
    }
})

const PopUp = mongoose.model('PopUp', popupSchema);

module.exports = { PopUp}