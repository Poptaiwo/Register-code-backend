const router = require('../route/user.route');
const userModel = require("../model/user.model")
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer")

const getHome = (req,res) =>{
    res.send("welcome home")
}

const registerUser = (req, res) =>{
    res.send("welcome to my register page")
}


//THIS IS FOR THE SIGN UP AND MAIL WILL BE SENT AFTER SIGNING UP SUCCESSFULLY
const postRegister = (req, res) =>{
    console.log(req.body);
    const {firstname, lastname, email, password} =req.body
    let user = new userModel(req.body)
    user.save()
    .then((res)=>{
        //  res.send({status: true, message:"user saved successfully"})
         console.log("user saved", res);
         let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
           })
    
        let mailOptions = {
            from: process.env.EMAIL, 
            to: "poptaiwo001@gmail.com", 
            subject: "Hello Pop", 
            text: "Hello world?", 
            html: `<!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Welcome to Our Service</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .email-container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 5px;
                    box-shadow: 0 2px 3px rgba(0,0,0,0.1);
                }
                .header {
                    text-align: center;
                    padding: 10px 0;
                    background-color: red;
                    color: white;
                    border-radius: 5px 5px 0 0;
                }
                .header h1 {
                    margin: 0;
                }
                .content {
                    padding: 20px;
                    line-height: 1.6;
                }
                .content p {
                    margin: 0 0 10px;
                }
                .footer {
                    text-align: center;
                    padding: 10px;
                    font-size: 12px;
                    color: #777;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="header">
                    <h1>Welcome to Our Service!</h1>
                </div>
                <div class="content">
                    <p>Hi [Taiwo],</p>
                    <p>Thank you for creating an account with us. We're thrilled to have you on board!</p>
                    <p>Here are some quick links to get you started:</p>
                    <ul>
                        <li><a href="#">Your Profile</a></li>
                        <li><a href="#">Get Started Guide</a></li>
                        <li><a href="#">Support</a></li>
                    </ul>
                    <p>If you have any questions or need assistance, feel free to reply to this email or visit our support page.</p>
                    <p>Best regards,</p>
                    <p>The [Sportybet] Team</p>
                </div>
                <div class="footer">
                    <p>&copy; 2024 [Sportybet   ]. All rights reserved.</p>
                    <p>1234 Street Address, City, State, ZIP</p>
                </div>
            </div>
        </body>
        </html>
        `,
          }
        
          transporter.sendMail(mailOptions)
          .then((info)=>{
            console.log(info)
            // res.send({status: true, message: "mail sent"})
          })
          .catch((err)=>{
            console.log(err)
            // res.send({status: false, message: "mail not sent"})
          })

    })
    .catch((err)=>{
        console.log(err, "user not saved");
        // res.send({status: false, message:"user not saved"})
    })

   
}



const loginUser = (req,res) =>{
    res.send("welcome to my login page")
}

////THIS IS FOR THE LOGIN AND GENERATNG A TOKEN FOR A PARTICULAR USER
const postLogin =(req,res) =>{
    console.log(req.body);
    let {email,password} = req.body
    userModel.findOne({email: email})
    .then((user)=>{
        console.log(user);
        if(user){
            let secret = process.env.SECRET
            user.validatePassword(password,(err,same)=>{
                if(same){
                   let token = jwt.sign({ email},secret, {expiresIn:"7h"})
                   console.log(token);
                    res.send({status: true, message:"password is correct", token})
                } else{
                    res.send({status: false, message:"password is incorrect"})
                }
            });
            console.log("hurray user found")
        } else{
            res.send("email not found")
        }
    })
}

//THE DASHBOARD AFTER THE USER SAVED AND FOUND IN THE DATABASE
const getDashboard = (req, res) => {
    let token = req.headers.authorization;
    let secret = process.env.SECRET
    jwt.verify(token, secret, (err,result)=>{
        if(err){
            console.log();
        } else{
            console.log(result);
        }
    })
}

// THIS IS THE SEND MAIL BUT I COPIED IT INTO THE SIGN UP CODE SO THAT THE USER CAN GET IT IMMEDIATELY THEY SIGNED UP
const sendMail= (req,res) =>{
//    let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL,
//         pass: process.env.PASSWORD
//     }
//    })

//    let mailOptions = {
//     from: process.env.EMAIL, 
//     to: "poptaiwo001@gmail.com", 
//     subject: "Hello Pop", 
//     text: "Hello world?", 
//     html: `<!DOCTYPE html>
// <html>
// <head>
//     <meta charset="UTF-8">
//     <title>Welcome to Our Service</title>
//     <style>
//         body {
//             font-family: Arial, sans-serif;
//             background-color: #f4f4f4;
//             margin: 0;
//             padding: 0;
//         }
//         .email-container {
//             max-width: 600px;
//             margin: 0 auto;
//             background-color: #ffffff;
//             padding: 20px;
//             border-radius: 5px;
//             box-shadow: 0 2px 3px rgba(0,0,0,0.1);
//         }
//         .header {
//             text-align: center;
//             padding: 10px 0;
//             background-color: red;
//             color: white;
//             border-radius: 5px 5px 0 0;
//         }
//         .header h1 {
//             margin: 0;
//         }
//         .content {
//             padding: 20px;
//             line-height: 1.6;
//         }
//         .content p {
//             margin: 0 0 10px;
//         }
//         .footer {
//             text-align: center;
//             padding: 10px;
//             font-size: 12px;
//             color: #777;
//         }
//     </style>
// </head>
// <body>
//     <div class="email-container">
//         <div class="header">
//             <h1>Welcome to Our Service!</h1>
//         </div>
//         <div class="content">
//             <p>Hi [Taiwo],</p>
//             <p>Thank you for creating an account with us. We're thrilled to have you on board!</p>
//             <p>Here are some quick links to get you started:</p>
//             <ul>
//                 <li><a href="#">Your Profile</a></li>
//                 <li><a href="#">Get Started Guide</a></li>
//                 <li><a href="#">Support</a></li>
//             </ul>
//             <p>If you have any questions or need assistance, feel free to reply to this email or visit our support page.</p>
//             <p>Best regards,</p>
//             <p>The [Sportybet] Team</p>
//         </div>
//         <div class="footer">
//             <p>&copy; 2024 [Sportybet   ]. All rights reserved.</p>
//             <p>1234 Street Address, City, State, ZIP</p>
//         </div>
//     </div>
// </body>
// </html>
// `,
//   }

//   transporter.sendMail(mailOptions)
//   .then((info)=>{
//     console.log(info)
//     res.send({status: true, message: "mail sent"})
//   })
//   .catch((err)=>{
//     console.log(err)
//     res.send({status: false, message: "mail not sent"})
//   })
}

module.exports = {getHome, registerUser, postRegister, loginUser, postLogin,getDashboard, sendMail}