const express = require("express");
const User = require("../models/userSchema");
const check_auth = require('../middlewares/check_auth')
const router = express.Router();

router.get('/',check_auth, (req, res)=>{
    User.findOne({_id : req.user.id}).then(user => {
        res.json({user});
    })
    .catch(error => res.status(404).json({error}))
})

module.exports = router;