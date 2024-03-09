const express = require('express')
const router = express()
const adminController = require('../controller/adminController')
const adminRender = require("../services/adminRender")

router.get('/adminRegistration', adminRender.adminRegistration);
router.get('/adminLogin',adminRender.adminLogin)
router.get('/adminHome',adminRender.adminHome)
router.get('/userDetails',adminRender.userDetails)
router.get('/adminProducts',adminRender.adminProducts)
router.get('/adminCategory',adminRender.adminCategory)
router.get('/addProduct',adminRender.addProduct)
router.get('/addCategory',adminRender.addCategory)
router.get('/blockUser',adminController.blockUser)
router.get('/adminHome', adminRender.adminHome);
router.get('/editProduct',adminRender.editProduct)
router.get('/deleteProduct',adminRender.deleteProduct)




router.post('/adminRegister', adminController.adminRegister);
router.post('/adminLogin', adminController.adminLogin)
router.post('/addProduct', adminController.addProduct)
router.post('/addCategory', adminController.addCategory)
router.post('/editProduct',adminController.editProduct)

module.exports = router