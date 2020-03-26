import { Document } from 'mongoose';

export interface IBooking extends Document {
        City_name: string,
        Car_type: string,
        Hours: number,
        License_number: string
}