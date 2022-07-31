const express = require('express');
const router = express.Router();
const Todo = require('../models/Todos');
// Get By Id
router.get('/get/:id', async (req, res) => {
    try {
        const todo = await Todo.findById({ _id: req.params.id.trim() });
        if (!todo) return res.status(404).json({ error: 'Todo Not Found.' });

        res.status(200).json(todo);
    } catch (error) {
        if (error) return res.status(400).json({ error: 'Bad Request' });
    }
});

// Get All Todo Route
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        if (!todos || todos.length <= 0) return res.status(404).json({ error: 'Todos Not Found.' });

        res.status(200).json(todos);
    } catch (error) {
        if (error) return res.status(400).json({ error: 'Bad Request' });
    }
});

// Create New Todo
router.post('/add', async (req, res) => {
    try {
        const newTodo = new Todo(req.body);
        const savedTodo = await newTodo.save();
        res.status(200).json(savedTodo);
    } catch (error) {
        if (error) return res.status(400).json({ error: 'Bad Request' });
    }
});

// Update By Id
router.put('/update/:id', async (req, res) => {
    try {
        const todo = await Todo.findById({ _id: req.params.id.trim() });
        if (!todo) return res.status(404).json({ error: 'Todo Not Found.' });

        const updatedTodo = await Todo.findByIdAndUpdate({ _id: req.params.id.trim() }, { $set: req.body });
        res.status(200).json(updatedTodo);
    } catch (error) {
        if (error) return res.status(400).json({ error: 'Bad Request' });
    }
});

// Delete By Id
router.delete('/delete/:id', async (req, res) => {
    try {
        const todo = await Todo.findById({ _id: req.params.id.trim() });
        if (!todo) return res.status(404).json({ error: 'Todo Not Found.' });

        const deletedTodo = await Todo.findByIdAndDelete({ _id: req.params.id.trim() });
        res.status(200).json(deletedTodo);
    } catch (error) {
        if (error) return res.status(400).json({ error: 'Bad Request' });
    }
});



module.exports = router

