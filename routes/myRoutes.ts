import express from 'express';
import { createTask } from '../controllers/myController';

const router = express.Router();

router.post('/', createTask);

export default router;