import { Router } from "express";
import {addNewTask, deleteTask, editTask, filterTask, getTasks} from "../controller/taskController.js";
const router=Router();

router.get('/',getTasks);
router.post('/add-task',addNewTask);
router.post('/delete',deleteTask);
router.put('/edit-task',editTask);
router.post('/filter-task',filterTask);

export default router;   