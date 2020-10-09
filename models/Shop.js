const mongoose = require('mongoose');

const shopSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    products:{
        type:Array,
        default:[],
    },
    popup:{
        type:Object,
        default:null
    }
})

const Shop = mongoose.model('Shop', shopSchema);

module.exports = { Shop}