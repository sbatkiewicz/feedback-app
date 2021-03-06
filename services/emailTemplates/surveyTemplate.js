const keys = require("../../config/keys");

module.exports = (survey) => {
  return `
    <html>
    <body style="color:white; background:#ea454b center">
      <div style="text-align: center">
        <h3>I'd like your feedback!</h3>
        <p>Please answer the following question(s):</p>
        <p>${survey.body}</p>
        <div>
          <a href="${keys.redirectDomain}/api/surveys/${survey.id}/yes">Yes</a>
        </div>
        <div>
          <a href="${keys.redirectDomain}/api/surveys/${survey.id}/no">No</a>
        </div>
      </div>
    </body>
    </html>
        
  `;

};