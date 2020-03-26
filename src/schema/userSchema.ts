
import mongoose = require('mongoose')
import  {IUser} from '../model/User'
const Schema = mongoose.Schema;

const userSchema : mongoose.Schema<IUser> = new mongoose.Schema<IUser>({

    firstName: {
        type: String,
        required: true,
        validate: {
            validator: function (value: string): boolean {
                return value.length > 0 && /^[a-zA-Z]*$/.test(value);
            },
            message: 'First name may only contain letters'
        }
    },

    lastName: {
        type: String,
        required: true,
        validate: {
            validator: function (value: string): boolean {
                return value.length > 2;
            },
            message: 'Last name name must have more than two characters'
        }
    },

    studentId: {
        type: Number,
        validate: {
            validator: function (value: number): boolean {
                return value > 0;
            },
            message: 'Student ID cannot be negative'
        }
    },

    Password:{
        type: String,
        validate: {
            validator: function (password: string): boolean {
                const pswd1 = /[a-z]/;
                const pswd2 = /[A-Z]/;
                const pswd3 = /[0-9]/;
                const psd1 = pswd1.test(password);
                const psd2 = pswd2.test(password);
                const psd3 = pswd3.test(password);
                return psd1 && psd2 && psd3 && password.length > 8 && password.length <12
            },
            message: "Password length should be 8 to 12 characters long with uppercase, lowercase letters and numbers"
        },
        required: true
    }
});

userSchema.pre<IUser>('validate', function (next) {
    if (this.firstName.toLowerCase() === 'john') {
        next(new Error('Made up names are not allowed'));
    }
    next();
});

userSchema.virtual('fullName')
    .get(function (this:IUser) {
        return this.firstName + ' ' + this.lastName;
    }).set(function (this: IUser, fullName: string) {
        if (!fullName.includes('-')) {
            throw new Error('Full name must have a hyphen between the first and last name');
        }
        const [firstName, lastName]: string[] = fullName.split('-');
        this.firstName = firstName;
        this.lastName = lastName;
    }
);

export const User = mongoose.model<IUser>('User', userSchema);