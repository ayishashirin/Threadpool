const express = require('express')
const app = express()
const session = require('express-session')
const dotenv = require('dotenv').config()
const path = require('path')
const jwt = require('jsonwebtoken') 
const morgan = require('morgan')
const cors = require('cors');
const connectDb = require("./server/database/connection")
connectDb()

const PORT = process.env.PORT || 8080
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
// app.use(morgan('dev'))
app.use(cors());


app.use(session({
    secret : 'threadpool',
    resave : false,
    saveUninitialized : false
}))


app.set('view engine' , 'ejs')

app.use('/',require('./server/routes/userRouter'))


app.use('/',require('./server/routes/adminRouter'))

app.use('/css',express.static(path.join(__dirname, "assets/css")))
app.use('/admincss',express.static(path.join(__dirname, "dashboardContent/css")))
app.use('/img',express.static(path.join(__dirname, "assets/img")))
app.use('/js',express.static(path.join(__dirname, "assets/js")))
app.use('/fonts',express.static(path.join(__dirname, "assets/fonts")))
app.use('/src',express.static(path.join(__dirname, "assets/src")))
app.use('/vendors',express.static(path.join(__dirname, "assets/vendors")))
app.use('/adminfont',express.static(path.join(__dirname, "dashboardContent/webfonts")))


app.listen(PORT , ()=>{
    console.log('Server is connected at the port '+PORT)
})