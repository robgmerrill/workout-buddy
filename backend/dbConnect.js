// dbConnect.js
import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
    }
};

export default dbConnect;
