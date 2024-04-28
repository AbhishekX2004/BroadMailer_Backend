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
                        color: wheat;
                        text-decoration: none;
                        border-radius: 5px;
                    }
                    .button:hover {
                        background-color: #0056b3;
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
            </body>
        </html>`
    );
}

export default template;
