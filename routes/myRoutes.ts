import express from 'express';
import { createTask, getAllTasks } from '../controllers/myController';

const router = express.Router();

router.post('/', createTask).get('/', getAllTasks);

export default router;