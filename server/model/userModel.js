const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var schema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: Number,
  password: { type: String, required: true },
  block: {
    type:Boolean,
    default : false
  },
  status: {
    type: String,
  },
  verified: Boolean,
  address: {
    type: [
      {
        locality: String,
        country: String,
        house_No: Number,
        district: String,
        state: String,
        city: String,
        altr_number: Number,
        postcode: Number,
      },
    ],
  },
});

const userDb = mongoose.model("user", schema);

module.exports = userDb;
