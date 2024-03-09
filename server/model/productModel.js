const { Schema, model, default: mongoose } = require("mongoose");
var schema = new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    image:{
        type:Array,
    },
    // category:{
    //     type:String,
    //     required:true
    // },
    collections:{
              type:String,
              required:true
    },
    description:{
                type:String,
                required:true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'categoryModel',  

    },
    
    size:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        required:true,
        default:0
    },
    action:{
        type:Boolean,
        default:false
    }
})


const productModel = model('productModel', schema);

module.exports = productModel;