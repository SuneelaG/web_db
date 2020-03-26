
import * as mongoose from 'mongoose';
import  {IReservation} from '../model/Reservation'

const reservationSchema = new mongoose.Schema<IReservation>({

    Car_type:{
        type: String,
        validate:{
            validator: function (car: string): boolean{
                return car.length > 3;
            }
        },
        required: true
    },

   Hours:{
        type: Number,
        validate:{
            validator: function (hours: number): boolean {
                return hours > 0;
            }
        },
        required: true
    },

    Comments: {
        type: String,
        validate:{
            validator: function (comments: string): boolean {
                return comments.length > 0 && comments.length < 100;
            }
        },
        required: true
    }
});

export const Reservation = mongoose.model<IReservation>('Reservation', reservationSchema);