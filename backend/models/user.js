require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    //repeat_password: { type: String, required: true},
    birthdate: { type: Date, required: true },
    gender: { type: String, enum: ['male', 'female', 'non-binary']},
    bio: String
});

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({_id: this._id}, process.env.JWTPRIVATEKEY, {expiresIn: '7d'});
};

const User = mongoose.model('User', userSchema);

const validate = data => {
    const schema = joi.object({
        firstName: joi.string().required().label("First Name"),
        lastName: joi.string().required().label("Last Name"),
        username: joi.string().alphanum().min(5).max(15).required().label("Username"),
        email: joi.string().email().required().label("Email"),
        password: passwordComplexity.required().label("Password"),
        //repeat_password: joi.ref('password').label("repeat Password"),
        birthdate: joi.date().raw().required().label("Birthdate"),
        gender: joi.string().valid('male', 'female', 'non-binary').required().label("Gender"),
    });
    return schema.validate(data);
};

module.exports = {User, validate};