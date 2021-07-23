const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const notifyServiceSid = process.env.NOTIFY_SERVICE_SID;

const client = require('twilio')(
  accountSid,
  authToken
);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.post('/api/messages', (req, res) => {
  console.log(req.body)
  res.header('Content-Type', 'application/json');
  client.messages
    .create({
      from: process.env.TWILIO_PHONE_NUMBER,
      to: req.body.to,
      body: req.body.body
    })
    .then(() => {
      res.send(JSON.stringify({ success: true }));
    })
    .catch(err => {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
    });
});

app.post('/api/bulk_messages', (req, res) => {
  console.log(req.body)
  res.header('Content-Type', 'application/json');
  client.notify.services(notifyServiceSid)
      .notifications.create({
        toBinding: JSON.stringify(req.body[0]),
        body: 'This is Nick. I just sent a bulk text message!'
      })
      .then(notification => console.log(notification.sid))
      .catch(error => console.log("send error: ", error));
});


app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
