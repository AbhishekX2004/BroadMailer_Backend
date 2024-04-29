import mongoose from "mongoose";
import reqLogin from "../middlewares/reqLogin.js";
import reqCredits from "../middlewares/reqCredits.js";
import Survey from "../models/Survey.js";
import template from "../services/emailTemplates/surveyTemplates.js";
import Mailer from "../services/Mailer.js";
import { Path } from "path-parser";
import { URL } from 'url';

// Note
// :surveyId and :choice are wildcards
// express will try to match them with incoming requests.

const surveyRoutes = (app) => {

    // route for those who click on the survey links
    app.get("/api/surveys/:surveyId/voted/:choice", (req, res) => {
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
            })

            // saving to the DataBase
            // this is a async code but we dont put it in async handler
            // since once we get data sendGrid dosent care it just needs confirmation that we get the data
            .forEach(({ surveyId, email, choice }) => {
                Survey.updateOne({          // update one record
                    _id: surveyId,
                    recipients: {
                        $elemMatch: { email: email, responded: false}   // searches for a recipient with specific matil and has not responded yet
                    }
                }, {
                    $inc: { [choice]: 1},                       // increase the value of choice by one
                    $set: { 'recipients.$.responded': true},    // sets responded true  { $ is the value of recipient from the elemMatch line above }
                    lastResponded: new Date()                   // updated the last responded with current date
                }).exec();      // exec executes the query
            });

        // uncomment to see final parsed elements
        // console.log(events);
 
        res.send({});
    });

    // route for dashboard to fetch surveys
    app.get('/api/surveys', reqLogin, async (req,res) => {
        
        // query to fetch the surveys of current user
        const surveys = await Survey.find({
            _user: req.user.id
        }).select({ recipients: false});    // tells to not send the list of recipients

        res.send(surveys);
    });
}

export default surveyRoutes;