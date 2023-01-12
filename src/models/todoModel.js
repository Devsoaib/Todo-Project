const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    username: {
        type: String
    },
    todoTitle: {
        type: String,
        required: true,
    },
    todoDescription: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "new"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
})

const todoModel = mongoose.model('todos', todoSchema);

module.exports = todoModel;