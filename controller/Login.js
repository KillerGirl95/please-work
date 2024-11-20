const express = require('express'); 
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcrypt'); 
const SECRET_KEY= 'bla';
const Schema = require('../model/schema');  
const router = express.Router();


router.post('/login', async (req, res) => {
    const { name, password } = req.body;
    try {
        // find user 
        const user = await Schema.findOne({ name });
        if (!user) return res.status(401).json({ message: `username not found` }); //find user 

        // compare password 
        const isMatch = await user.comparePassword(password);
        if (!isMatch) { return res.status(401).json({ message: 'Invalid password' }); } //compare entered pwd with hashed pwd 

        // generate jwt token 
        const token = jwt.sign({ id: user._id, username: user.username }, SECRET_KEY, { expiresIn: '1h' }); //sign jwt
        res.json({ token });   

    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router 