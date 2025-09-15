import express from "express"
import { addTask, getTasks, updateTask, deleteTask } from "../controllers/taskController.js"
import requireAuth from "../middleware/requireAuth.js";
const router = express.Router();

// Create task
router.post("/", requireAuth, addTask)
// List tasks (optionally filter by ?category=...)
router.get("/", requireAuth, getTasks)
// Update task (partial)
router.patch("/:id", requireAuth, updateTask)
// Delete task
router.delete("/:id", requireAuth, deleteTask)

export default router;