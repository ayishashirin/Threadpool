const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

var schema = new mongoose.Schema({
    username: { 
        type : String,
        required : true 
       },
    email : {
        type: String,
        required : true,
        unique : true
    },
    password : {  
        type : String,
        required: true
    },
    mobile : {
        type : Number,
        required : true 
    }

})


const adminDb = mongoose.model("adminDb", schema);

module.exports = adminDb;
