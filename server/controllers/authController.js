const smsService = require('../services/smsService');
const otpService = require('../services/otpService');
const tokenService = require('../services/tokenService');
const { json } = require('body-parser');

//send otp to client
const sendOtp = async (req, res) => {
    const { phoneNumber } = req.body; 

    try {
        //generate otp
        const otpCode = await otpService.generateOtp(phoneNum);

        //format phone num and setup message
        const formattedPhone = phoneNumber.replace('+', '');
        const message = `Your OTP is ${otpCode}`;
        
        //send otp
        await smsService.sendSMS(formattedPhone, message);

        //announce client
        res.status(200).json({
            success: true,
            message: 'OTP sent successfully',
        });

    } catch (err) {
        console.error("auth controller error:", err.message);
        

        if (err.message === 'USER_NOT_FOUND') {
            return res.status(404).json({ message: "Phone number incorrect!!" });
        }
        
        res.status(500).json({ error: err.message });
    }
}

//validate otp
const verifyOtp = async (req, res) => {
    const { phoneNumber, codeInput } = req.body;

    try {
        //call otp validate service
        const userData = await otpService.validateOtp(phoneNumber, codeInput);

        const payload = json({
            phoneNum: userData.phoneNum,
            role: userData.role,
            name: userData.name
        })

        const jwt = tokenService.generateToken(payload);

        //return success status
        res.status(200).json({ 
            success: true, 
            message: "Login successfully",
            user: userData,
            token: jwt
        });

    } catch (error) {
        console.error("Verify Error:", error.message);

        //validation processing
        if (error.message === 'OTP_NOT_REQUESTED') {
            return res.status(400).json({ message: "Please requrest OTP first!" });
        }
        if (error.message === 'INVALID_OTP') {
            return res.status(400).json({ message: "OTP incorrect!" });
        }

        res.status(500).json({ error: error.message });
    }
};

module.exports = { sendOtp, verifyOtp };