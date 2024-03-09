const userDb = require("../model/userModel")
const otp = require("../model/otpModel")
const nodemailer = require("nodemailer")
const Mailgen = require("mailgen")

function otpGenerator(){
    return Math.floor(1000 + Math.random() * 9000);
}
function sendOtp(email, Otp) {
    console.log("otp",Otp)
    // console.log("Sendotp")
    let config = {
        service: 'gmail',
        auth: {
            user: process.env.EMAIL, 
            pass: process.env.PASSWORD
        }
    }


    let transporter = nodemailer.createTransport(config)

    let MailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Threadpool",
            link: 'http://mailgen.js/'
        }
    })


    let response = {
        body: {
            name: email,
            intro: `Your OTP is ${Otp}`,
            outro: "Thank you"
        }
    };


    let mail = MailGenerator.generate(response)

    let message = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Otp sent successfully',
        html: mail
    };

    transporter.sendMail(message);

}

exports.resendOtp = async (req, res) => {
    try {
        console.log("1");
        const email = req.session.email;

        // Generate a new OTP
        const newOtp = otpGenerator();
      
        console.log("newOtp",newOtp);

        // Call the sendOtp function with the new OTP
        sendOtp(email, newOtp);

        // Assuming enteredOtp is obtained from the request body or query parameters
        const enteredOtp = req.body.enteredOtp; // Adjust as needed

        // Check if the entered OTP matches the saved OTP
        const savedNewOtp = await NewOtp.findOne({ email, newOtp: enteredOtp });

        if (savedNewOtp) {
            // If the OTP matches, delete the entry
            await NewOtp.findOneAndDelete({ email, newOtp: enteredOtp });

            res.redirect('/');
        } else {
            res.redirect('/signup');
        }

        res.status(200).json({ success: true, message: 'OTP resent successfully' });
    } catch (error) {
        console.error('Error resending OTP:', error);
        res.status(500).json({ success: false, message: 'Error resending OTP' });
    }
};





exports.insertUser = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password, username, mobile, confirmPassword } = req.body;

        // Check if required fields are missing or contain only spaces
        if (!email.trim() || !password.trim() || !username.trim() || !mobile.trim() || !confirmPassword.trim()  ||  !mobile.length == 10) {
            
            return res.redirect('/signup');
        }

        // Check if password and confirmPassword match
        if (password !== confirmPassword) {
            console.log("Password and Confirm Password do not match");
            return res.redirect('/signup');
        }

        // Store user details in session
        req.session.userName = username;
        req.session.email = email;
        req.session.mobile = mobile;
        req.session.password = password;

        // Check if OTP already exists for this email
        const existingOtp = await otp.findOne({ email });

        if (existingOtp) {
            console.log("OTP for this email already exists");
            return res.render('signup');
        }

        // Generate OTP
        const generatedOtp = otpGenerator();

        // Store the OTP in the session or do other necessary operations
        req.session.generatedOtp = generatedOtp;

        // Send the OTP
        sendOtp(email, generatedOtp);

        // Save the OTP document to the database
        const otp1 = new otp({
            email,
            otp: generatedOtp
        });

        const otpdata = await otp1.save();

        if (otpdata) {
            res.render('userSide/otpVerify');
        } else {
            res.render('signup');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};



exports.loginPost = async (req, res) => {
    try {
     const user = await userDb.findOne({email:req.body.email})
     if (user.block) {
        return res.redirect("/login")
     }
     if(user){
        // console.log('2')
        if(user.password == req.body.password){
            res.redirect('/')
        }else{
            res.redirect('/login');
        }
     }else{
        res.send('user not exist')
     }
    } catch (error) {
        res.send('Error from try catch: ' + error);
    }
};

exports.verifyOtp = async(req,res)=>{
  try {
    
    const { Otp } = req.body;
    const savedOtp = await otp.findOne({otp: Otp });
    const enteredOtp = Number(Otp)

    if (enteredOtp === savedOtp.otp) {

        const user = new userDb({
            username: req.session.userName,
            email: req.session.email,
            mobile: req.session.mobile,
            password: req.session.password
        })

        const saveduser = await user.save();
        
    }else{
        delete req.session.userName
        delete req.session.email
        delete req.session.mobile
        delete req.session.password
    }
    if (savedOtp && savedOtp.otp== enteredOtp){
        await otp.findOneAndDelete({enteredOtp});
    
    res.redirect('/');
} else {
    res.redirect('/home');
}
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
}
  }

  exports.returnStore = async(req,res)=>{try {
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
}
    
  }




