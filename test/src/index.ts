import express from "express";
import apiExpress from 'typescript-express-basic';
import { PublicController } from './controllers/publicController';

const port = 3000;
let app = apiExpress;
app.use(express.json());

// Register controller
app.registerController(new PublicController());

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});