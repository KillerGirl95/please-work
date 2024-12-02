const express = require("express");
const jwt = require('jsonwebtoken'); 
const SECRET_KEY= 'bla';

const Schema = require("../model/schema.js");
const router = express.Router();
const Authorization = require("../middleware/Authorization.js");

exports.signup= async (req, res) => {
    console.log("Request received:", req.body);
    const { name, email, password } = req.body;
    try {
        let crud = new Schema(req.body);
        crud = await crud.save();
        !crud
            ? res.status(404).send("Document not found")
            : res.status(200).json(crud);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send(error.message);
    }
}

exports.signout = async (req, res) => {
    res.clearCookie("t")
    return res.status(100).json({ message: "successfully signed out" })
}

exports.signin= async (req, res) => {
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
}



