const router = require("express").Router();
const verify = require("../verifyToken");

const User = require("../models/User");
const CryptoJS = require("crypto-js");

//Update
router.put("/:id", verify, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(
                req.body.password,
                process.env.SECRET_KEY
            ).toString();
        }
        try {
            //$set remplaza todos lo valores que reciba
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You can update only your account!");
    }
});
//Delete
router.delete("/:id", verify, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        try {
            await User.findByIdAndDelete(req.user.id);
            res.status(200).json("User has been deleted");
        } catch (error) {
            res.status(500).json(err);
        }
    }
});
//Get
router.get("/find/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...info } = user._doc;
        res.status(200).json(info);
    } catch (error) {
        res.status(500).json(error);
    }
});
//Get All
router.get("/findAll", verify, async (req, res) => {
    const query = req.query.new
    if (req.user.isAdmin) {
        try {
            const users = query ? await User.find().sort({_id: -1}).limit(10) : await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json(`Not allowed to see all the users :(`);
    }
});
//Get user Stats

module.exports = router;
