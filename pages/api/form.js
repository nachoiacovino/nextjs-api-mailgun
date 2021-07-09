// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
let API_KEY = process.env.API_KEY;
let DOMAIN = process.env.DOMAIN;
let mailgun = require('mailgun-js')({ apiKey: API_KEY, domain: DOMAIN });

export default (req, res) => {
  let reqBody;
  try {
    reqBody = req.body && JSON.parse(req.body);
  } catch (e) {
    reqBody = req.body;
  }

  const name = reqBody?.name || "There was a problem retrieving the name.";
  const email = reqBody?.email || "bigeba8@gmail.com";
  const message = reqBody?.message || "There was a problem retrieving the message.";

  const data = {
    from: `${name} <${email}>`,
    to: 'bigeba8@gmail.com',
    subject: `New lead from ${name}`,
    text: `Text is: ${message}`
  };

  try {
    mailgun.messages().send(data, (error, body) => {
      res.status(200).send({ message: 'Success', body, error });
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
