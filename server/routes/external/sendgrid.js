const sgMail = require('@sendgrid/mail');
const keys = require('../../../keys');

sgMail.setApiKey(keys.SENDGRID_API_KEY);

module.exports = (app) => {
  /*
    Documentation

    */
  app.post('/api/v1/sendgrid/send', async (req, res) => {
    sgMail
      .send(req.body.email)
      .then(() => {
        res.send({ success: true });
      })
      .catch((err) => {
        console.log(err.message);
        res.send({ success: false, message: err.message });
      });
  });
};
