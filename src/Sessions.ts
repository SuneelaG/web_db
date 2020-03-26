
import mongoose = require('mongoose');
export interface ISessions extends mongoose.Document {
    fullName: string,
    Session_ID: string
}