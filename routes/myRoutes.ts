import express from 'express';
import { createTask, getAllTasks, updateTask, deleteTask } from '../controllers/myController';

const router = express.Router();

router.post('/', createTask).get('/', getAllTasks);
router.put('/update/:id', updateTask);
router.delete('/delete/:id', deleteTask);

export default router;