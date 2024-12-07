const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { 
        type: String, 
        match: [/.+\@.+\.+/, "invalid email format"], 
        unique: true, 
        required: true,
        lowercase: true, 
        trim: true 
    },
    password: { type: String, required: true, minlength: 4}

}, {
    timestamps:true
}
);

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});


userSchema.methods.comparePassword = async function (pwdInput) {
    return bcrypt.compare(pwdInput, this.password);
};


//remove password before sending response
userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    return user;
};

const User = mongoose.model("user", userSchema)

module.exports = User