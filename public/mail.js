let submitBtn = document.getElementById("contactus-submit")
    let userEmail = document.getElementById("email");
    let Sib = require("sib-api-v3-sdk")
    require('dotenv').config()

    const client = Sib.ApiClient.instance

    const apiKey = client.authentications['api-key']
    apiKey.apiKey = process.env.API_KEY


    const tranEmailApi = new Sib.TransactionalEmailsApi()

    const sender = {
        email: "rohanb459@gmail.com"
    }

    const receivers = [
        {
                email: userEmail
        },
    ]

    submitBtn.addEventListener("click",
    tranEmailApi.sendTransacEmail({
        sender,
        to: receivers,
        subject: "Thank you for contcting us",
        textContent: "thanks for submitting form",
    }).then(console.log)
    .catch(console.log)
    )
        

//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