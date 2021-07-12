const express = require("express");
const path = require("path")
const app = express();
const nodemailer = require("nodemailer");

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
    service: 'gmail',
    auth: {
        // user: 'tribytz@gmail.com',
        // pass: 'test@1234'

        user: process.env.USER,
        pass: process.env.PASS
    }
})

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
