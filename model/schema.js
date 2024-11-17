const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({
    name: { type: String, required: "name required" },
    email: { type: String, match: [/.+\@.+\.+/, "invalid email format"], unique: true , required: true},
    password: { type: String, required: "password required" },
    title: { type: String },
    author: { type: String },
    publicationYear: { type: Number},
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
    return bcrypt.compare(pwdInput, this.password);
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