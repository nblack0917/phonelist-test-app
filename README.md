# Send SMS with React and Twilio

This is an test run of PhoneList sending SMS using React and Twilio and saving contacts to phone.

## Running the project

Fork and clone the project, change into the directory and install the dependencies with `npm i`

```bash
git clone https://github.com/nblack0917/phonelist-test-app
cd phonelist-test-app
npm i
```

Copy the `.env.example` file to `.env` and fill in Twilio credentials and phone number. Ask Nick for credintials or create new Twilio account with Notify Service

Start the application on its own with the command:

```bash
npm run dev
```

Open the app at [localhost:3000](http://localhost:3000).

## Use of test

Select download link for each user to download contact info to phone.
Select message link to send text message. Only first name currently work. Trial version of Twilio requires recipient numbers to be verified. Contact nick to add your number.
Check boxes for bulk message. Only check box once. You cannot currently remove name from list.
