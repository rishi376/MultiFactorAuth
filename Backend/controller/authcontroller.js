const User = require("../model/authmodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const twilio = require("twilio");

const twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

function generateJwtToken(userId) {
    const payload = {
        user : {
            id: userId, 
        },
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 });
}

exports.register = async (req, res) => {
    try {
        const { username, email, password, phone } = req.body;
        let user = await User.findOne({email});
        if (user && user.length > 0) {
            return res.status(400).json({
                message: "User Already Exists",
                success: false,
            });
        }
        user = new User({ 
            username: username, 
            email: email, 
            password: password, 
            phone: phone
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        const token = generateJwtToken(user._id);
        return res.status(201).json({
            success: true,
            token: token,
            message: "User registered successfully",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server Error! New user registration failed",
            success: false,
        })
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email});
        if (!user && user.length < 0) {
            return res.status(400).json({
                message: "Invalid Login credentials",
                success: false,
            });
        }
        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {
            return res.status(400).json({
                message: "Invalid Login credentials",
                success: false,
            });
        }
        const verificationCode = Math.floor(100000 + Math.random() * 900000);
        const codeExpires = new Date();
        codeExpires.setMinutes(codeExpires.getMinutes() + 10);
        user.logincode = verificationCode;
        user.codeExpires = codeExpires;
        await user.save();

        await twilioClient.messages.create({
            body: `Your Login verification code is ${verificationCode}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: `+91` + user.phone,
        });
        return res.status(200).json({
            message: "Verification code sent to your phone",
            userId: user._id,
        });
    } catch (error) {
        console.log("Error");
        return res.status(500).json({
            message: "Internal server error, Login unsuccessful",
            success: false,
        });
    }
};

exports.verify = async (req, res, next) => {
    try {
        const { userId, code } = req.body;
        const user = await User.findById(userId);
        if (!user && user.length < 0) {
            return res.status(400).send("User not found!");
        }
        const currentTime = new Date();
        if( currentTime > user.codeExpires ) {
            return res.status(400)
                .send("Verification code has expired login again to receive a new code");
        }
        if ( user.logincode !== code ) {
            return res.status(400)
                .send("Invalid Verification code");
        }

        user.verified = true;
        user.codeExpires = null;
        user.logincode = null;
        await user.save();
        const token = generateJwtToken(user._id);
        return res.status(200).json({
            message: "User successfully verified",
            token: token,
        });
    } catch (error) {
        return res.status(500).json("verification Error: " + error.message);
    }
};