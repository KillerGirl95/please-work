const jwt = require('jsonwebtoken'); 
const User = require("../model/user");

exports.signup= async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = new User(req.body);
        user = await user.save();
        
        const token = jwt.sign({ 
            id: user._id, 
            email: user.email 
        }, process.env.SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({ 
            email: user.email, 
            name: user.name,
            token 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
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
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ error: 'Email not found' }); 

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid password' }); 

        const token = jwt.sign({ 
            id: user._id, 
            email: user.email 
        }, process.env.SECRET_KEY, { expiresIn: '1h' });      

        res.json({ 
            email: user.email, 
            name: user.name,
            token 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



