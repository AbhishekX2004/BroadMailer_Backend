import mongoose from "mongoose";
import reqLogin from "../middlewares/reqLogin.js";
import reqCredits from "../middlewares/reqCredits.js";
import Survey from "../models/Survey.js";
import template from "../services/emailTemplates/surveyTemplates.js";
import Mailer from "../services/Mailer.js";
import { Path } from "path-parser";
import { URL } from 'url';

const surveyRoutes = (app) => {

    // route for those who click on the survey links
    app.get("/api/surveys/voted", (req, res) => {
        res.send(`
            <h1 style="text-align: center;">Thanks for Valuable Response !!</h1>
        `);
    });

    app.post("/api/surveys", reqLogin, reqCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;

        // instance of the survey
        const survey = new Survey({
            title: title,
            subject: subject,
            body: body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        });
        try {
            // mailer
            const mailer = new Mailer(survey, template(survey));
            await mailer.send();

            // saving the survey once mail has been sent
            await survey.save();

            // reducing the credits from the user and saving the user
            // {1 credit for 1 survey}
            req.user.credits -= 1;
            const user = await req.user.save();

            // send the user back updates the user in the website
            res.send(user);
        } catch (error) {
            console.log(error);
            res.status(422).send(error);  // 422 means unprocessable request
        }
    });

    app.post('/api/surveys/webhooks', (req, res) => {

        // uncomment to see the incoming webhook data
        // console.log(req.body);

        const p = new Path('/api/surveys/:surveyId/voted/:choice');

        // parsing the incomming data
        const events = req.body
            .map(({ email, url }) => {
                // uncomment to see the parsed response
                // if not parsable it returns null
                // console.log(p.test(new URL(url).pathname));

                const match = p.test(new URL(url).pathname);

                // if not null
                if (match) {
                    return {
                        email: email,
                        surveyId: match.surveyId,
                        choice: match.choice
                    };
                }
            })
            .filter(event => event !== undefined)   // removes undefined elements
            .filter((event, index, self) => {
                // Check if the current event is the first occurrence based on email and surveyId
                return index === self.findIndex(e =>
                    e.email === event.email && e.surveyId === event.surveyId
                );
            });

        // uncomment to see final parsed elements
        // console.log(events);

 
        res.send({});
    });
}

export default surveyRoutes;