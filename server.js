require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // ✅ Import path module
const Task = require('./models/task');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// Serve frontend documentation on `/`
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'docs.html')); // ✅ This will now work correctly
});

// Routes
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json({
            message: "API documentation is available at the / directory",
            tasks: tasks
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/tasks/progress', async (req, res) => {
    const tasks = await Task.find({ status: "in-progress" });
    res.json(tasks);
});

app.get('/tasks/done', async (req, res) => {
    const tasks = await Task.find({ status: "done" });
    res.json(tasks);
});

app.get('/tasks/pending', async (req, res) => {
    const tasks = await Task.find({ status: "pending" });
    res.json(tasks);
});

app.post('/tasks', async (req, res) => {
    try {
        const { title, description, status, priority, dueDate } = req.body;
        const newTask = new Task({
            title,
            description,
            status: status || "in-progress",
            priority: priority || "medium",
            dueDate: dueDate || null
        });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status, priority, dueDate } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { title, description, status, priority, dueDate },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json({ message: 'Task deleted successfully', task: deletedTask });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Export the app for Vercel
module.exports = app; // ✅ Enable this line for Vercel deployment
