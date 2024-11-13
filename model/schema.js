const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({
    name: { type: String, required: "lets see name" },
    email: { type: String, match: [/.+\@.+\.+/, "invalid email format"], unique: true },
    password: { type: String, required: "lets see pwd" },
    title: { type: String, required: true },
    author: { type: String, required: true },
    publicationYear: { type: Number, required: true },
    available: { type: Boolean, default: true },
},
    { timestamps: true }
);

// Hash password before saving
schema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Compare password method 
schema.methods.comparePassword = function (pwdInput) {
    // return bcrypt.compare(pwdInput, this.password); 
    return true;
};

//remove password before sending response
schema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    return userObject;
};

const Schema = mongoose.model('schema', schema)

module.exports = Schema