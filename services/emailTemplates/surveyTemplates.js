import { redirectDomain } from "../../config/keys.js";

let domain = await redirectDomain;

const template = (survey) => {
    return (
        // uncomment to send the mail containing the survey info
        // '<div>' + survey + '</div>'
        `<html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        text-align: center;
                        padding: 20px;
                    }
                    .survey-title {
                        font-size: 24px;
                        margin-bottom: 10px;
                    }
                    .survey-body {
                        margin-bottom: 20px;
                    }
                    .button-container {
                        margin-top: 20px;
                    }
                    .button {
                        display: inline-block;
                        padding: 10px 20px;
                        background-color: #007bff;
                        color: white;
                        text-decoration: none;
                        border-radius: 5px;
                    }
                    .button:hover {
                        background-color: #0056b3;
                    }
                    @keyframes textShine {
                        0% {
                            background-position: 0% 50%;
                        }
                    
                        100% {
                            background-position: 100% 50%;
                        }
                    }
                    
                    .myGradientText {
                        font-weight: bolder;
                        background: linear-gradient(to right,
                                #7953cd 20%,
                                #00affa 30%,
                                #0190cd 70%,
                                #764ada 80%);
                        -webkit-background-clip: text;
                        background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-size: 500% auto;
                        animation: textShine 5s ease-in-out infinite reverse;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h3>We would like your valuable input!!</h3>
                    <p>Please answer the survey</p>
                    <h4 class="survey-title">${survey.title}</h4>
                    <p class="survey-body">${survey.body}</p>
                    <div class="button-container">
                        <a class="button" href="${domain}/api/surveys/${survey.id}/voted/yes">Yes</a>
                        <a class="button" href="${domain}/api/surveys/${survey.id}/voted/no">No</a>
                    </div>
                </div>
                <p>
                    Want to send similar surveys to your customer? 
                    Come join us at <span class = "myGradientText"><a href = "${domain}">BroadMailer</a></span> !!
                </p>
                <p>
                    Disclaimer : This is a computer generated mail, the sending ID and our service is not liable for any content in the mail.
                    In case of any issues please reply to the mail with your contact credentials and the issue.
                    We will try to get to you as soon as possible.
                </p>
            </body>
        </html>`
    );
}

export default template;
