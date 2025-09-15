import taskModel from "../models/taskModel.js";
import userModel from "../models/userModel.js";
import { createTransport } from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();

const sendMail = async (email, subject, title, description) => {
    if (!process.env.GMAIL_USERNAME || !process.env.GMAIL_PASSWORD) return;
    try {
        const transporter = createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USERNAME,
                pass: process.env.GMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.GMAIL_USERNAME,
            to: email,
            subject: subject,
            html: `<h1>Task added successfully</h1><h2>Title: ${title}</h2><h3>Description: ${description}</h3>`
        };

        await transporter.sendMail(mailOptions);
    } catch (err) {
        console.log('sendMail error:', err.message);
    }
}

// POST /tasks - create a task
const addTask = async (req, res) => {
    try {
        const { title, description = '', category = 'general' } = req.body;
        if (!title) return res.status(400).json({ message: 'Title is required' });
        const userId = req.user.id;
        const user = await userModel.findById(userId);
        const newTask = new taskModel({ title, description, category, userId, isDone: false });
        const saved = await newTask.save();
        // Async fire-and-forget email for task addition
        sendMail(user.email, 'Task Added', title, description);
        return res.status(201).json(saved);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// GET /tasks - list tasks for current user, optional ?category=work
const getTasks = async (req, res) => {
    try {
        const userId = req.user.id;
        const filter = { userId };
        if (req.query.category) filter.category = req.query.category;
    const tasks = await taskModel.find(filter).sort({ createdAt: -1 });
    // Return extra fields to keep frontend compatible (completed & description & createdAt)
    return res.status(200).json(tasks.map(t => ({ id: t._id, title: t.title, category: t.category, isDone: t.isDone, completed: t.isDone, description: t.description, createdAt: t.createdAt })))
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// PATCH /tasks/:id - update fields (e.g., isDone)
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const task = await taskModel.findById(id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        if (task.userId.toString() !== userId) return res.status(403).json({ message: 'Forbidden' });
        const updates = req.body;
        Object.assign(task, updates);
        const saved = await task.save();
        return res.status(200).json(saved);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// DELETE /tasks/:id
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const task = await taskModel.findById(id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        if (task.userId.toString() !== userId) return res.status(403).json({ message: 'Forbidden' });
        await taskModel.findByIdAndDelete(id);
        return res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export { addTask, getTasks, updateTask, deleteTask }
