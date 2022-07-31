const mongoose = require('mongoose');

const TodosSchema = new mongoose.Schema({
    todo: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('todo', TodosSchema)