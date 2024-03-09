const adminDb = require("../model/adminModel");
const crypto = require("crypto");
const userModel = require("../model/userModel");
const productModel = require("../model/productModel");
const categoryModel = require("../model/categoryModel");
const userDb = require("../model/userModel");
const { default: mongoose } = require("mongoose");



exports.adminRegister = async (req, res) => {
  try {
    console.log("hi");
    const { email, password, username, mobile } = req.body;

    if (!email || !password || !username || !mobile) {
      return res.send("Registration failed");
    }

    const newAdmin = new adminDb({
      email: email,
      password: password,
      username: username,
      mobile: mobile,
    });

    const adminData = await newAdmin.save();

    if (adminData) {
      res.send("Registered successfully");
    } else {
      res.send("Registration failed");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.adminLogin = async (req, res) => {
  try {
    const email = "ayisha@gmail.com";
    const pass = "1234";

    if (email == req.body.email && pass == req.body.password) {
      res.redirect("/adminHome");
    } else {
      res.redirect("/adminLogin");
    }
  } catch (error) {
    res.send("Error from try catch: " + error);
  }
};

exports.addProduct = async (req, res) => {
  try {
    const { image, productName, description, collections, category, size, price, stock } = req.body;

    const addProduct = new productModel({
      image,
      productName,
      description,
      collections: collections, 
      category:category,
      size,
      price,
      stock,
      
    });

    await addProduct.save();
    
    res.redirect("/adminProducts");
  } catch (error) {
    res.send("Error adding product " + error);
  }4
};

exports.addCategory = async (req, res) => {
  try {
    const { image, categoryName, description, collections  } = req.body;

    const addCategory = new categoryModel({
      image,
      categoryName,
      description,
      collections:collections
      
    });    
    console.log(addCategory);
    
    await addCategory.save();
    res.redirect("/adminCategory");
  } catch (error) {
    res.send("Error adding category " + error);
  }
};



exports.blockUser = async (req,res)=>{
  try {
    const id = req.query.id
    console.log(id);
     const user = await userDb.findOne({_id:id})
     console.log(user);
     if(user.block){
      await userDb.updateOne({_id:id},{$set:{block:false}})
    res.redirect("/userDetails") 
    }else{
      await userDb.updateOne({_id:id},{$set:{block:true}})
        res.redirect("/userDetails")
    }

  } catch (error) {
    res.send(error)
    
  }
}


exports.editProduct = async (req, res) => {
  try {
    const { image, productName, description, collections, category, size, price, stock } = req.body;

    const editProduct = new productModel({
      image,
      productName,
      description,
      collections: collections, 
      category:category,
      size,
      price,
      stock,
      
    });

    await editProduct.save();
    
    res.redirect("/adminProducts");
  } catch (error) {
    res.send("Error adding product " + error);
  }4
};
