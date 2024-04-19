import sendgrid, { mail as helper } from "sendgrid";
import { sendGridKey } from "../config/keys.js";

let key; // Declare a global variable to store the SendGrid API key

// Function to asynchronously await the SendGrid API key
async function getKey() {
    key = await sendGridKey;
}

class Mailer extends helper.Mail {
    constructor({ subject, recipients }, content) {
        super();

        getKey(); // Call the function to get the SendGrid API key asynchronously

        // sendGrid setup (note: this part should be executed after the key is resolved)
        this.from_email = new helper.Email("abhishekaverma20@gmail.com");
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients);

        this.addContent(this.body);
        this.addClickTracking();
        this.addRecipients();
    }

    // format the email address
    formatAddresses(recipients) {
        return recipients.map(({ email }) => {
            return new helper.Email(email);
        });
    }

    // enable tracking of the yes/no links in the mail
    addClickTracking() {
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    // adding the recipients to the mail
    addRecipients() {
        const personalize = new helper.Personalization();
        this.recipients.forEach(recipient => {
            personalize.addTo(recipient);   // adding the recipient to mail
        });
        this.addPersonalization(personalize);
    }

    // send the mails
    async send() {
        await getKey(); // Ensure the key is resolved before sending the email

        // Initialize SendGrid client with the key
        this.sgAPI = sendgrid(key);

        const request = this.sgAPI.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        });

        const response = await this.sgAPI.API(request);
        return response;
    }
}

export default Mailer;