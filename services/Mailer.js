import sgMail from '@sendgrid/mail';
import { sendGridKey } from '../config/keys.js';

class Mailer {
    constructor({ subject, recipients }, content) {
        this.fromEmail = 'codewithabhishek2026@gmail.com';
        this.subject = subject;
        this.body = content;
        this.recipients = this.formatAddresses(recipients);
    }

    // Format the email addresses
    formatAddresses(recipients) {
        return recipients.map(({ email }) => email);
    }

    // Enable click tracking
    addClickTracking() {
        return {
            click_tracking: {
                enable: true,
                enable_text: true,
            },
        };
    }

    // Prepare the email data
    prepareEmail(to) {
        const msg = {
            to,
            from: this.fromEmail,
            subject: this.subject,
            html: this.body,
            tracking_settings: this.addClickTracking(),
        };
        return msg;
    }

    // Send the emails
    async send() {
        try {
            const key = await sendGridKey;
            sgMail.setApiKey(key);

            const sendPromises = this.recipients.map(recipient => {
                const msg = this.prepareEmail(recipient);
                return sgMail.send(msg);
            });

            const responses = await Promise.all(sendPromises);
            return responses;
        } catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
    }
}

export default Mailer;












// older code (Used older version of SendGrid API)



// import sendgrid, { mail as helper } from "sendgrid";
// import { sendGridKey } from "../config/keys.js";

// let key; // Declare a global variable to store the SendGrid API key

// // Function to asynchronously await the SendGrid API key
// async function getKey() {
//     key = await sendGridKey;
// }

// class Mailer extends helper.Mail {
//     constructor({ subject, recipients }, content) {
//         super();

//         getKey(); // Call the function to get the SendGrid API key asynchronously

//         // sendGrid setup (note: this part should be executed after the key is resolved)
//         this.from_email = new helper.Email("abhishekaverma20@gmail.com");
//         this.subject = subject;
//         this.body = new helper.Content('text/html', content);
//         this.recipients = this.formatAddresses(recipients);

//         this.addContent(this.body);
//         this.addClickTracking();
//         this.addRecipients();
//     }

//     // format the email address
//     formatAddresses(recipients) {
//         return recipients.map(({ email }) => {
//             return new helper.Email(email);
//         });
//     }

//     // enable tracking of the yes/no links in the mail
//     addClickTracking() {
//         const trackingSettings = new helper.TrackingSettings();
//         const clickTracking = new helper.ClickTracking(true, true);

//         trackingSettings.setClickTracking(clickTracking);
//         this.addTrackingSettings(trackingSettings);
//     }

//     // adding the recipients to the mail
//     addRecipients() {
//         const personalize = new helper.Personalization();
//         this.recipients.forEach(recipient => {
//             personalize.addTo(recipient);   // adding the recipient to mail
//         });
//         this.addPersonalization(personalize);
//     }

//     // send the mails
//     async send() {
//         await getKey(); // Ensure the key is resolved before sending the email

//         // Initialize SendGrid client with the key
//         this.sgAPI = sendgrid(key);

//         const request = this.sgAPI.emptyRequest({
//             method: 'POST',
//             path: '/v3/mail/send',
//             body: this.toJSON()
//         });

//         const response = await this.sgAPI.API(request);
//         return response;
//     }
// }

// export default Mailer;