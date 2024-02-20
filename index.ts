import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

import { myControllerFunction } from './controllers/myController';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Express + Typescript Server running');
});

app.get('/controller', myControllerFunction);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});