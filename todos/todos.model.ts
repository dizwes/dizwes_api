import * as mongoose from 'mongoose'

export interface Todo extends mongoose.Document{
  name: String,
  done: Boolean,
  createAt: Date
}

export interface UserTodo extends mongoose.Document {
  name: string,
  email: string,
  todo: Todo[]
}

const todoSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
  },
  done:{
    type: Boolean,
    default: false,
  },
  createdAt:{
    type: Date,
    default: Date.now
  }
})

const userTodoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true,
  },
  todo: {
    type: [todoSchema],
    required: false,
    select: false,
    default: []
  }
})

export const UserTodo = mongoose.model<UserTodo>('UserTodo', userTodoSchema)
