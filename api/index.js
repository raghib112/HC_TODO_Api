require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Task = require('../models/task'); // Update the path

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Routes
app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

app.get('/tasks/progress', async (req, res) => {
    const tasks = await Task.find({ status: "in-progress" });
    res.json(tasks);
});

app.get('/tasks/done', async (req, res) => {
    const tasks = await Task.find({ status: "done" });
    res.json(tasks);
});

app.post('/tasks', async (req, res) => {
    try {
        const { title, description, status, priority, dueDate } = req.body;
        const newTask = new Task({
            title,
            description,
            status: status || "pending",
            priority: priority || "medium",
            dueDate: dueDate || null
        });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Export the app for Vercel
module.exports = app;
