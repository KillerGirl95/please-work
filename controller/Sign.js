const jwt = require('jsonwebtoken'); 
const User = require("../model/user");

exports.signup= async (req, res) => {
    console.log("Request received:", req.body);
    const { name, email, password } = req.body;
    try {
        let crud = new User(req.body);
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
    try {
        // Clear the token on the client-side
        return res.status(200).json({ 
            message: "Successfully signed out",
            clearToken: true
        });
    } catch (error) {
        console.error('Signout error:', error);
        return res.status(500).json({ 
            message: "Error during signout", 
            error: error.message 
        });
    }
};

exports.signin= async (req, res) => {
    const { email, password } = req.body;
    try {
        // find user 
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: `email not found` }); //find user 

        // compare password 
        const isMatch = await user.comparePassword(password);
        if (!isMatch) { return res.status(401).json({ message: 'Invalid password' }); } //compare entered pwd with hashed pwd 

        // generate jwt token 
        const token = jwt.sign({ 
                id: user._id, 
                username: user.username 
            },
            process.env.SECRET_KEY, 
            { expiresIn: '1h' }
        );      //sign jwt
        res.json({ token });

    } catch (error) {
        res.status(500).send(error.message)
    }
}



