import mongoose from 'mongoose';

export function connectToMongodb(callback: Function) {
  mongoose
    .connect(process.env.MONGO_URI!)
    .then((client) => {
      console.log('[+] DB CONNECTED SUCCESSFULLY');
      callback();
    })
    .catch((error) => {
      console.log('[-] DB CONNECTION FAILED');
      console.log(error);
    });
}
