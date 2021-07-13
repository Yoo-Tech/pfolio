const express = require("express");
const path = require("path")
const app = express();
// const nodemailer = require("nodemailer");

// const express = require('express')
const bodyParser= require('body-parser')
const nodemailer = require('nodemailer')
const { google } = require('googleapis')

const OAuth2 = google.auth.OAuth2
const oauth2Client = new OAuth2(
// process.env.CLIENTID,
// process.env.CLIENTSECRET,
"https://developers.google.com/oauthplayground")

app.use(express.urlencoded({
  extended: true
}));

const PORT = process.env.PORT || 3000;

require("dotenv").config();

// Middleware
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'public','index.html'))

 })

 app.post("/", (req, res)=>{
    console.log(req.body);

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        type: "OAuth2",
        user: process.env.EMAIL, // email you are using with nodemailer
        pass: process.env.PASSWORD, // email password
        clientId: process.env.CLIENTID,
        clientSecret:process.env.CLIENTSECRET,
        refreshToken: process.env.REFRESHTOK,
        accessToken: process.env.ACCESSTOK,
    },
    tls:{
       rejectUnauthorized:false 
    }
  });

    const mailOptions ={
        from: req.body.email,
        to: 'omarjbt@gmail.com',
        subject: `Message from ${req.body.email}: ${req.body.subject}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info)=>{
        if(error){
            console.log(error)
        } else{
            console.log('Email sent:' + info.response)
            res.send('success')
        }
    })

 })

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
