const sendgrid = require("sendgrid");
const helper = sendgrid.mail;
const keys = require("../config/keys");

class Mailer extends helper.Mail{
    constructor({subject, recipients}, content){
        super();

        this.sgApi = sendgrid(keys.sendGridKey);
        this.from_email = new helper.Email("test2dev5342@gmail.com");
        this.subject = subject;
        this.body = new helper.Content("text/html", content);
        this.recipients = this.formatAddresses(recipients);

        this.addContent(this.body);//Provided by helper.Mail
        this.addClickTracking();
        this.addRecipients();
    }

    formatAddresses(recipients){
        return recipients.map(({email}) => { // boilerplate for formatting emails
            return new helper.Email(email);
        });
    }

    addClickTracking(){//Boilerplate function for configuring Sendgrid.
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    addRecipients(){//Another required boilerplate function for processing emails
        const personalize = new helper.Personalization();

        this.recipients.forEach(recipient => {
            personalize.addTo(recipient);
        });
        this.addPersonalization(personalize);
    }

    async send(){
        const request = this.sgApi.emptyRequest({ //Prepare the request to be sent with configs
            method: "POST",
            path: "/v3/mail/send",
            body: this.toJSON()
        });

       const response = await this.sgApi.API(request); //This is the line that actually sends the email
       return response;
    }
}

module.exports = Mailer;