import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

//Middleware for parsing the request body
app.use(express.json());

//Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors(
    {
        //origin: ["https://deploy-mern-1whq.vercel.app"],
        origin: ["book-list-api-delta.vercel.app"],
        methods: ["POST", "GET"],
        credentials: true
    }
));

/* Option 2: Allow Custom Origins via CORS
app.use(
    cors({
        origin: 'http://localhost:5555',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);*/

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome To MERN Stack');
});

app.use('/books', booksRoute);


mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    })