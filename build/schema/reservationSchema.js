"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = __importStar(require("mongoose"));
var reservationSchema = new mongoose.Schema({
    Car_type: {
        type: String,
        validate: {
            validator: function (car) {
                return car.length > 3;
            }
        },
        required: true
    },
    Hours: {
        type: Number,
        validate: {
            validator: function (hours) {
                return hours > 0;
            }
        },
        required: true
    },
    Comments: {
        type: String,
        validate: {
            validator: function (comments) {
                return comments.length > 0 && comments.length < 100;
            }
        },
        required: true
    }
});
exports.Reservation = mongoose.model('Reservation', reservationSchema);
