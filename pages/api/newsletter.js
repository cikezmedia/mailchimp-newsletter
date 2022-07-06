import axios from 'axios';

export default async (req, res) => {
  const { validMail } = req.body;
  const email = validMail;

  const API_KEY = process.env.MAILCHIMP_API_KEY;
  const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;

  const url = `https://us17.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;

  const subscriber = {
    email_address: email,
    status: 'subscribed',
  };

  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `api_key ${API_KEY}`,
    },
  };

  try {
    const result = await axios.post(url, subscriber, options);
    // if (response.status >= 400) {
    //   return res.status(400).json({
    //     message: `There was an error subscribing to the newsletter. Contact the original creator at ogbonnakell@gmail.com and he will assist you.`,
    //   });
    // }
    if (result.status >= 400) {
      return res
        .status(400)
        .send({ result: 'There was an error subscribing to the newsletter' });
    }
    return res
      .status(201)
      .send({ result: 'Thank you for subscribing to our newsletter.' });
  } catch (error) {
    return res.status(500).send({ error: 'Newsletter subscription failed' });
  }
};
