const mongoose = require("mongoose");
const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

const Survey = mongoose.model("surveys");// Slightly different approach since we already imported surveys model into index

module.exports = (app) => {

  app.get("/api/surveys", requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id })
      .select({recipients: false, });

    res.send(surveys);
  });


    app.get("/api/surveys/:surveyId/:choice", (req, res) => {
      res.send(`
          <h1 style="text-align:center;margin-top:50px;color:#ea454b; font-size: 60px;">Emaily</h1>
          <h2 style="text-align:center;margin-top:10px;font-size: 36px;">Thanks for your feedback!</h2> 
        `);
    });

    app.post("/api/surveys/webhooks", (req, res) => {
      const p = new Path("/api/surveys/:surveyId/:choice");
       _.chain(req.body)
        .map( ({email, url}) => {  
          const match = p.test(new URL(url).pathname); //Grabs only the route
          if(match){
            return {email, surveyId: match.surveyId, choice: match.choice};
          }
        })
        .compact()
        .uniqBy("email", "surveyId")
        .each(({surveyId, email, choice}) => {
          Survey.updateOne(
            {
              _id: surveyId,
              recipients: {
                $elemMatch: { email: email, responded: false},
              },
            }, {
              $inc: {[choice]: 1},
              lastResponded: new Date(),  
              $set: {"recipients.$.responded": true},
            }
          ).exec();
        })
      .value();

      res.send({});
    });

    app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients} = req.body;
        console.log("A survey was just sent by user: " + req.user.id)
        const survey = new Survey({
            title,//since variables are same name, this is the same as title: title
            subject,
            body,
            recipients: recipients.split(",").map(email => ({email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now() 
        });

        const mailer = new Mailer(survey, surveyTemplate(survey));
        try{
          await mailer.send();
          await survey.save();
          req.user.credits -= 1;
          const user = await req.user.save();
          
          res.send(user);
        }
        catch (err){
          res.status(422).send(err);
        }
        
    });
};