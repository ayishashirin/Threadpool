const express = require('express')
const router = express()
const adminController = require('../controller/adminController')
const adminRender = require("../services/adminRender")
const userdb = require("../model/userModel")
const productModel = require('../model/productModel')
const categoryModel = require('../model/categoryModel')



exports.adminRegistration = (req, res) => {
    console.log("hi");
    res.render("adminSide/adminRegistration");
};

exports.adminLogin = (req,res)=>{
    res.render("adminSide/adminLogin");
}

exports.adminHome = (req,res)=>{
    console.log("kjjjjj")
    res.render("adminSide/adminHome")
}

exports.userDetails = async(req,res)=>{
    const users = await userdb.find()
    res.render("adminSide/userDetails",{users})
}
 
exports.adminProducts =async(req,res)=>{
    const products = await productModel.find().populate('category').exec(); 
    console.log(products);
    res.render("adminSide/adminProducts",{products})
}


exports.adminCategory =async (req,res)=>{
    const category = await categoryModel.find()

    res.render("adminSide/adminCategory", {category})
}

exports.addProduct =async(req,res)=>{

    const category = await productModel.find()
      
    res.render("adminSide/addProduct",{category})
}


exports.addCategory =(req,res)=>{
    res.render("adminSide/addCategory")
}

exports.threadpool = (req, res) => {
    res.render("adminSide/adminHome");
 };
 

 exports.deleteProduct = (req,res) =>{
    res.render("adminSide/deleteProduct");
}


exports.editProduct = async(req,res) =>{

    const category = await productModel.find()

    res.render("adminSide/editProduct",{category});
}

