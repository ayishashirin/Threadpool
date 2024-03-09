const { Schema, model, default: mongoose } = require("mongoose");

var schema = new mongoose.Schema({
    
    categoryName:{
        type:String,
        required:true
    },
    image:{
        type:Array,
    },
    description:{
        type:String,
        required:true
    },
    collections:{
              type:String,
              required:true
    }
})


const categoryModel = model('categoryModel', schema);

module.exports = categoryModel;