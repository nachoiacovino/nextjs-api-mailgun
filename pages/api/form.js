// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
let API_KEY = 'key-0dc454a132e089f79541cc7333589384';
let DOMAIN = 'mg.weblime.com';
let mailgun = require('mailgun-js')({ apiKey: API_KEY, domain: DOMAIN });

export default (req, res) => {
  /*   const { name, email, message } = JSON.parse(req.body); */

  let reqBody;
  try {
    reqBody = req.body && JSON.parse(req.body);
  } catch (e) {
    reqBody = req.body;
  }

  const name = reqBody?.name || "Name";
  const email = reqBody?.email || "hello@yes.com";
  const message = reqBody?.message || "pls";

  /*   console.log({ 'req.body': req.body, reqBody, name, email, message }); */

  /*   console.log("req.query", req.query);
    console.log("req.body", req.body);
    console.log("req.body.email", req.body.email);
    console.log('req.bodyjson', reqBody);
    console.log('req.bodyjson.email', reqBody.email); */

  const data = {
    from: `${name} <${email}>`,
    to: 'bigeba8@gmail.com, nacho.iacovino@gmail.com',
    subject: `New lead from ${name}`,
    text: `Text is: ${message}`
  };

  /*   const data = {
      from: 'Excited User <me@samples.mailgun.org>',
      to: 'bigeba8@gmail.com, nacho.iacovino@gmail.com',
      subject: 'Hello',
      text: `Text is:`
    }; */

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
