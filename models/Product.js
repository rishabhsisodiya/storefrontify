const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    shop:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Shop',
    },
    productList:{
        type:Array,
        default:[],
    }

})

const Product = mongoose.model('Product', productSchema);

module.exports = { Product }