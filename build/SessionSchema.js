"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var SessionSchema = new mongoose.Schema({
    fullName: {
        type: String,
    },
    Session_ID: {
        type: String
    }
});
exports.Sessions = mongoose.model('Sessions', SessionSchema);
