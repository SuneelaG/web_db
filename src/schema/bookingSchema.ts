
import * as mongoose from 'mongoose';
import  {IBooking} from '../model/Booking'

const bookingSchema = new mongoose.Schema({
    City_name:{
        type: String,
        validate: {
            validator: function (city: string): boolean {
                return city.length > 3
            }
        },
        required: true
    },

    Car_type:{
        type: String,
        validate:{
            validator: function (cartype: string): boolean {
                return cartype.length > 3;
            },
        },
        required: true,
    },

    Hours:{
        type: Number,
        validate:{
            validator: function (hours: number): boolean {
                return hours > 0;
            },
        },
        required: true,
    },

    License_number:{
        type: String,
        validate:{
            validator: function (dl: string): boolean{
                return dl.length > 7 && dl.length < 11
            }
        },
        required: true
    }
});

export const Booking = mongoose.model<IBooking>('Booking', bookingSchema);