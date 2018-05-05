import * as mongoose from 'mongoose'

export interface User extends mongoose.Document {
  name: string,
  email: string,
  password: string
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 80
  },
  email: {
    type: String,
    unique: true,
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ,
    required: true
  },
  password: {
    type: String,
    select: false,
    minLength: 6,
    maxLength: 80,
    required: true
  }
})

export const User = mongoose.model<User>('User', userSchema)
