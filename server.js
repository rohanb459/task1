const express = require("express");
const app = express();

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Sib = require("sib-api-v3-sdk")
    require('dotenv').config()

const client = Sib.ApiClient.instance

const apiKey = client.authentications['api-key']
apiKey.apiKey = process.env.API_KEY


const tranEmailApi = new Sib.TransactionalEmailsApi()

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
mongoose.connect("mongodb+srv://admin:v7owLvq06TEtGTaD@cluster0.bvg1dkr.mongodb.net/carboledger")

//filter emails
const rejectList = [ "gmail.com" , "yahoo.com" ];

        function validateEmailField(email)
        {
            var emailValue = email; // To Get Value (can use getElementById)
            var splitArray = emailValue.split('@'); // To Get Array

            if(rejectList.indexOf(splitArray[1]) >= 0)
            {
            // Means it has the rejected domains
            return false;
            }
            return true;

        }

// create a data schema
const contactFormData = {
    name: String,
    email: String,
    message: String
}

// data model
const contactForm = mongoose.model("contactForm", contactFormData);
// get req
app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/public/index.html");
})

// post req
app.post("/", (req,res)=>{

    let newContactForm = new contactForm({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    })


    let email = req.body.email;
    if(validateEmailField(email)==false)
    {
        res.send("We don't accept personal email ID");
    }
    else
    {
    newContactForm.save();


    const sender = {
        email: "rohanb459@gmail.com"
    }

    const receivers = [
        {
                email: req.body.email
        }
    ]

    tranEmailApi.sendTransacEmail({
        sender,
        to: receivers,
        subject: "Thank you for contcting us",
        textContent: "thanks for submitting form",
    }).then(console.log)
    .catch(console.log)

    res.redirect('/');

    }

})



app.listen(3000);
console.log("Server is running on 3000");