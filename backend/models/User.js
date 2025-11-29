import mongoose from 'mongoose'
import roles from '../constants/roles.js'
const UserSchema = mongoose.Schema(
  {
    login: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: Number,
      default: roles.USER,
    },
  },
  { timestamps: true },
)

export const User = mongoose.model('User', UserSchema)
