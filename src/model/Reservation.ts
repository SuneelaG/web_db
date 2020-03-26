import { Document } from 'mongoose';

export interface IReservation extends Document {
    Car_type: string,
    Hours: number,
    Comments: string
}