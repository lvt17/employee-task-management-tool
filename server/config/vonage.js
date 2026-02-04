const { Vonage } = require('@vonage/server-sdk');
const dotenv = require('dotenv');

dotenv.config();

//must exist both api key and secret
if (!process.env.VONAGE_KEY || !process.env.VONAGE_SECRET) {
    console.warn("not exist api key or secret");
}

//config vonage
const vonage = new Vonage({
  apiKey: process.env.VONAGE_KEY,
  apiSecret: process.env.VONAGE_SECRET
});

module.exports = vonage;