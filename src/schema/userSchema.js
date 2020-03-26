"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value.length > 0 && /^[a-zA-Z]*$/.test(value);
            },
            message: 'First name may only contain letters'
        }
    },
    lastName: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value.length > 2;
            },
            message: 'Last name name must have more than two characters'
        }
    },
    studentId: {
        type: Number,
        validate: {
            validator: function (value) {
                return value > 0;
            },
            message: 'Student ID cannot be negative'
        }
    },
    Password: {
        type: String,
        validate: {
            validator: function (password) {
                var pswd1 = /[a-z]/;
                var pswd2 = /[A-Z]/;
                var pswd3 = /[0-9]/;
                var psd1 = pswd1.test(password);
                var psd2 = pswd2.test(password);
                var psd3 = pswd3.test(password);
                return psd1 && psd2 && psd3 && password.length > 8 && password.length < 12;
            },
            message: "Password length should be 8 to 12 characters long with uppercase, lowercase letters and numbers"
        },
        required: true
    }
});
userSchema.pre('validate', function (next) {
    if (this.firstName.toLowerCase() === 'john') {
        next(new Error('Made up names are not allowed'));
    }
    next();
});
userSchema.virtual('fullName')
    .get(function () {
    return this.firstName + ' ' + this.lastName;
}).set(function (fullName) {
    if (!fullName.includes('-')) {
        throw new Error('Full name must have a hyphen between the first and last name');
    }
    var _a = fullName.split('-'), firstName = _a[0], lastName = _a[1];
    this.firstName = firstName;
    this.lastName = lastName;
});
exports.User = mongoose.model('User', userSchema);
