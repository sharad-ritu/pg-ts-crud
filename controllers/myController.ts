import { Request, Response } from 'express';

export function myControllerFunction(req: Request, res: Response): void {
    // Implement your controller logic here
    res.send('Hello from my controller!');
}