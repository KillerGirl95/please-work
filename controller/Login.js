const express = require('express'); 
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcrypt'); 
const SECRET_KEY= 'bla';
const User = require('../model/schema');  
const router = express.Router();


router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(401).json({ message: `username not found: ${username}` }); //find user 

        const isMatch = await user.comparePassword(password);
        if (!isMatch) { return res.status(401).json({ message: 'Invalid password' }); } //compare entered pwd with hashed pwd 

        const token = jwt.sign({ id: user._id, username: user.username }, SECRET_KEY, { expiresIn: '1h' }); //sign jwt
        res.json({ token });    //attach tkn in response

    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router 