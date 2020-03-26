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
var bookingSchema = new mongoose.Schema({
    City_name: {
        type: String,
        validate: {
            validator: function (city) {
                return city.length > 3;
            }
        },
        required: true
    },
    Car_type: {
        type: String,
        validate: {
            validator: function (cartype) {
                return cartype.length > 3;
            },
        },
        required: true,
    },
    Hours: {
        type: Number,
        validate: {
            validator: function (hours) {
                return hours > 0;
            },
        },
        required: true,
    },
    License_number: {
        type: String,
        validate: {
            validator: function (dl) {
                return dl.length > 7 && dl.length < 11;
            }
        },
        required: true
    }
});
exports.Booking = mongoose.model('Booking', bookingSchema);
