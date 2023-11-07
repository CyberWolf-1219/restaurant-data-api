import mongoose, { Document, Schema, } from "mongoose";

interface IRestaurant extends Document {
    name: string;
    address: {
        street: string;
        city: string;
        country: string;
    };
    contact: {
        phone: string;
        email: string;
    };
    ratings:
    {
        userID: string;
        rating: number;
    }[],
    rating: number;
    menu: {
        name: string;
        price: number
    }[],
    openHours:
    {
        day: "MON" | "TUE" | "WED" | "THIR" | "FIR" | "SAT" | "SUN"
        open: string;
        close: string
    }[],
}


const RestaurantSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        address: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            country: { type: String, required: true },
        },
        contacts: {
            phone: {
                type: String,
                validate: (value: string) => {
                    return /\+?\d{1,4} \d{3} \d{4}/.test(value)
                },
                required: true,
            },
            email: {
                type: String,
                validate: (value: string) => {
                    return /^[^\s@]+\@[^\s@]+\.[^\s@]+$/.test(value)
                },
                required: true,
            }
        },
        ratings: [
            {
                userID: { type: String, required: true },
                rating: {
                    type: Number,
                    min: [ 0, "Invalid Rating" ],
                    max: [ 5, "Invalid Rating" ],
                    required: true,
                },
            } ],
        rating: { type: Number, required: true },
        menu: [ {
            name: { type: String, required: true },
            price: { type: Number, required: true }
        } ],
        openHours:
            [ {
                day: {
                    type: String,
                    enum: [ 'MON', 'TUE', 'WED', 'THI', 'FRI', 'SAT', 'SUN' ],
                    required: true,
                },
                opensAt: {
                    type: String,
                    validate: (value: string) => {
                        return /\d\d:\d\d\s['AM'|'PM']/.test(value);
                    },
                    required: true
                },
                closesAt: {
                    type: String,
                    validate: (value: string) => {
                        return /\d\d:\d\d\s['AM'|'PM']/.test(value);
                    },
                    required: true,
                }
            } ],
    }
);

export default mongoose.model<IRestaurant>('Restaurant', RestaurantSchema);