const express = require('express')
const router = express()
const userController = require('../controller/userController')
const userRender = require("../services/userRender")
console.log('223')

//get routes
router.get('/', userRender.home)

router.get('/login', userRender.login)

router.get('/products',userRender.products)

router.get('/signup',userRender.signup)
console.log('start')
router.get('/logout',userRender.logout)

router.get('/returnStore',userController.returnStore)
router.get('/home',userRender.home)

router.get('/product',userRender.product)

router.get('/threadpool',userRender.threadpool)



//post routes
router.post('/signup-post', userController.insertUser)
console.log('1')
router.post('/login-post',userController.loginPost)
router.post('/verify-otp',userController.verifyOtp)
router.post('/resend-otp',userController.resendOtp)

module.exports = router 