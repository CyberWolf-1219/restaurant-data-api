import mongoose from "mongoose";

export let DB: typeof mongoose | null = null;

export function connectToMongodb(callback: Function) {
    mongoose.connect(process.env.MONGO_URI!)
        .then((client) => {
            console.log('[+] DB CONNECTED SUCCESSFULLY');
            DB = client;
            callback();
        })
        .catch((error) => {
            console.log('[-] DB CONNECTION FAILED');
            console.log(error)
        })
}

export function getDatabase() {
    if (DB) {
        return DB;
    } else {
        throw new Error('[-] NO DATABASE FOUND')
    }
}