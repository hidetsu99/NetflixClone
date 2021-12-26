const router = require("express").Router();
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken')

const User = require("../models/User");

//Register

router.post("/register", async (req, res) => {
    const newUser = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.SECRET_KEY
        ).toString(),
        profilePic: req.body.profilePic,
    });
    const user = await newUser.save();
    res.status(201).json(user);
});

//Login

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json("Wrong password or username")   
        }
        // Parsing the password
        const bytes = CryptoJS.AES.decrypt(
            user.password,
            process.env.SECRET_KEY
        );
        const originalPass = bytes.toString(CryptoJS.enc.Utf8)
        
        //Checking if the pass its equal to wroten pass
        if (originalPass !== req.body.password) {
            return res.status(401).json("Wrong password or username");
        }

        //Admin JWT
        const accessToken =  jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, process.env.SECRET_KEY, {expiresIn: '5d'})

        // Deleting password from response for sec
        // _doc extrac all data from de mongoose search
        const {password ,...info} = user._doc;

        res.status(200).json({...info, accessToken});
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
