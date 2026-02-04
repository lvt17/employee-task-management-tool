const utils = require('../utils/queryUtils');
const dotenv = require('dotenv');

dotenv.config();

const generateOtp = async(req) => {
const {phoneNum} = req.body;
    let otp;

    try {
        //call function check existed user
        let userExisted = false, dev = false;
        //phone for quick test
        if(phoneNum === process.env.PHONE_DEV) {
            userExisted = true; 
            dev = true;
        }
        //phone user
        else userExisted = utils.userExist(phoneNum);

        //if not
        if(!userExisted) return res.status(404).json({message: "Phone number does not exist"});

        //otp test mode
        if(dev) otp = '123456';

        //spawn 4char otp
        else otp = Math.floor(1000 + Math.random() * 9000).toString();

        //save to db
        db.collection('otpCode').doc(phoneNum).set({
            otp: otp,
            createAt: new Date().toISOString()
        })

        return otp;

    } catch(err) {
        console.log('auth error: ', err);
        res.status(500).json({error: err.message});
    }
}

const validateOtp = async(phoneNum, input) => {
    const doc = await db.collection('accessCodes').doc(phoneNum).get();

    if (!doc.exists) {
        throw new Error("Otp not requested!!");
    }

    const data = doc.data();

    if (data.code !== codeInput) {
        throw new Error("Otp incorrect!!");
    }

    // reset otp
    await db.collection('otpCode').doc(phoneNum).delete();

    // get user
    const userSnapshot = await db.collection('users')
        .where('phoneNum', '==', phoneNum)
        .get();

    return userSnapshot.docs[0].data();
};

module.exports = { generateOtp, validateOtp };