import express from 'express';
import dotenv from 'dotenv/config';

const PORT = process.env.PORT || 3000;

// express app
const app = express();

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the App' })
})


app.listen(4000, () => {
    console.log('Running on port 4000')
})