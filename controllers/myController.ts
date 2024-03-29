import { Request, Response } from 'express';
import pool from '../db/db';
import { Task } from '../models/task';
import { QueryResult } from 'pg';

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

export const getAllTasks = async (req: Request, res: Response) => {
    try {
        const result: QueryResult<Task> = await pool.query('SELECT * FROM tasks');
        const tasks: Task[] = result.rows;
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error fetching tasks', error);
        res.status(500).json({ error: 'error fetching tasks' });
    }
};

export const updateTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, completed } = req.body;

    try {
        const result = await pool.query('UPDATE tasks SET title = $1, completed = $2 WHERE id = $3 RETURNING *',
        [title, completed, id]
        );
        const updatedTask = result.rows;
        res.status(201).json(updatedTask);
    } catch (error) {
        console.error('error updating task', error);
        res.status(500).json({ error: 'error updating task' });
    }
};

export const deleteTask = async(req: Request, res: Response) => {
    const { id } = req.params;

    if(isNaN(parseInt(id, 10))) {
        return res.status(400).json({ error: 'Invalid task id' });
    }
    try {
        await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'error deleting task' });
    }
};