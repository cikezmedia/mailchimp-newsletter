import axios from 'axios';

export default async (req, res) => {
  const { validMail } = req.body;
  const email = validMail;

  const API_KEY = process.env.MAILCHIMP_API_KEY;
  const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
  const MAIL_SERVER = process.env.MAILCHIMP_SERVER;
  // MAILCHIMP_API_KEY looks like d6f7046baf81848oep0f94y9b09768ed
  // MAILCHIMP_AUDIENCE_ID looks like 69po748rue
  // MAILCHIMP_SERVER looks like us17

  const url = `https://${MAIL_SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;

  const subscriber = {
    email_address: email,
    status: 'subscribed',
  };

  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  try {
    await axios.post(url, subscriber, options);
    res.status(201).send();
  } catch (err) {
    if (err.errno) {
      res.status(203).send();
    } else {
      res.status(202).send();
    }
  }
};
