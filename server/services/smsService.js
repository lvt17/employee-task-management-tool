const vonage = require('../config/vonage');

const sendSMS = async (to, message) => {

    from = process.env.VONAGE_BRAND_NAME;

    try {
        await vonage.sms.send({to, from, text});

        if (result.messages[0]['status'] !== '0') {
            throw new Error(`Vonage Error: ${result.messages[0]['error-text']}`);
        }

    } catch(err) { 
        console.error("SMS service error: ", err.message);
        throw err;
    };
}

module.exports = sendSMS;
