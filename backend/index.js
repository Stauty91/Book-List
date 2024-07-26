import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import { Book } from './bookModel.js';
import booksRoute from './booksRoute.js';
import cors from 'cors';

const app = express();
console.log('Index.js file is loaded');

//Middleware for parsing the request body
app.use(express.json());

//Middleware for handling CORS POLICY
app.use(cors({
    origin: "https://book-list-frontend-nine.vercel.app",
    methods: ["POST", "GET", "PUT", "DELETE"],
}));


mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');

            app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log("Fehler bei der Verbindung zur Datenbank",error);
    })

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome To Book List App - Backend Server');
});

app.use('/books', booksRoute);

// Export the app for serverless environments
export default app;