import { Request, Response } from 'express';
import pool from '../db/db';
import { Task } from '../models/task';

export const createTask = async (req: Request, res: Response) => {
    const { id, title, completed } = req.body;

    // if (typeof task !== 'string' || task.trim() === '') {
    //     return res.status(400).json({ error: 'Invalid task data' });
    // }

    try {
        const result = await pool.query(
            'INSERT INTO tasks (id, title, completed) VALUES ($1, $2, $3) RETURNING *',
            [id, title, completed]
        );
        const createdTask: Task = result.rows[0];
        res.status(201).json(createdTask);
    } catch (error) {
        console.error('Error creating task', error);
        res.status(500).json({ error: 'error creating task' });
    }
};