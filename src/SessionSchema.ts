
import mongoose = require('mongoose');
import  {ISessions} from './Sessions'
const Schema = mongoose.Schema;

const SessionSchema : mongoose.Schema<ISessions> = new mongoose.Schema<ISessions>({
    fullName:{
        type: String,
    },
    Session_ID:{
        type: String
    }
});

export const Sessions = mongoose.model<ISessions>('Sessions', SessionSchema);