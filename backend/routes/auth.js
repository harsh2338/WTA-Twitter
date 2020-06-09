const express = require("express");
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const check_auth = require("../middlewares/check_auth");
const jwt = require("jsonwebtoken");
const jwt_key = require("../config/jwt_key")

const router = express.Router();

router.post("/signup", (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err)
            return res.status(500).json({ error: err });

        user_data = {
            name: req.body.name,
            email: req.body.email,
            password: hash
        };
        user = new User(user_data)
        user.save()
            .then((user) => {
                res.status(201).json({
                    message: "User created",
                    user
                });
            })
            .catch(err => res.status(409).json({ error: err }));
    });
});

router.post("/login", (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user)
                return res.status(401).json({
                    message: "Auth failed"
                });

            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err)
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                if (!result)
                    return res.status(403).json({
                        message: "Auth failed"
                    });
                const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, jwt_key, { expiresIn: "3h" });
                const username = user.name
                return res.status(200).json({
                    message: "Auth successful",
                    token,
                    username
                });
            });
        })
        .catch(err => res.status(401).json({ message: err }));
});

module.exports = router;