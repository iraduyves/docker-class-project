import express from 'express';
import mainRouter from './routes/index.js';
import mongoose from 'mongoose';
import config from "../config.js";
import bodyParser from 'body-parser';
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const connectToDB = async () => {
    try {
        await mongoose.connect(config.db_uri, {});
        console.log('MongoDB connected');
    } catch (e) {
        console.log(e);
        console.log('MongoDB connection failed:', e);
        process.exit(1);
    }
};

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v1', mainRouter);

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'CRUD PROJECT API',
            version: '1.0.0',
            description: 'A simple CRUD API WITH MONGO DB HOSTED ON DOCKER',
            contact: {
                name: 'Yves',
                email: 'iradukundayvves11@gmail.com'
            },
        },
        servers: [
            {
                url: `http://localhost:3000/api/v1`
            },
        ],
    },
    apis: ["./src/routes/*.js"],
};

const specs = swaggerJSDoc(options);

app.use("/api/v1/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use("/api/v1/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.get('/', (req, res) => {
    res.send('Welcome to the CRUD API WITH MONGO DB HOSTED ON DOCKER');
});

await connectToDB();

export default app;
