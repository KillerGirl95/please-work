const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({
    name: { type: String, required: "lets see name" },
    email: { type: String, match: [/.+\@.+\.+/, "invalid email format"], unique: true, required: true },
    password: { type: String, required: "lets see pwd" },
    title: { type: String },
    author: { type: String },
    publicationYear: { type: Number },
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


schema.methods.comparePassword = async function (pwdInput) {
    return await bcrypt.compare(pwdInput, this.password);
};


//remove password before sending response
schema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    return user;
};

const Schema = mongoose.model("schema", schema)

module.exports = Schema