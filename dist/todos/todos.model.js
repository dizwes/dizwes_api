"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    done: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const userTodoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    todo: {
        type: [todoSchema],
        required: false,
        select: false,
        default: []
    }
});
exports.UserTodo = mongoose.model('UserTodo', userTodoSchema);
