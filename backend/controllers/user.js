import bcrypt from 'bcrypt'

import ROLES from '../constants/roles.js'
import { User } from '../models/User.js'
import mapUser from '../helpers/mapUser.js'
import { generateToken } from '../helpers/token.js'

export async function register(login, password) {
  if (!password) {
    throw new Error('Password is empty')
  }
  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await User.create({ login, password: hashedPassword })
  const token = generateToken({ id: user.id })

  return { user: mapUser(user), token }
}

export async function login(login, password) {
  const user = await User.findOne({ login })

  if (!user) {
    throw new Error('User not found')
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    throw new Error('Invalid password')
  }

  const token = generateToken({ id: user.id })

  return { user: mapUser(user), token }
}

export function getUsers() {
  return User.find()
}
export function getRoles() {
  return [
    { id: ROLES.ADMIN, name: 'Admin' },
    { id: ROLES.MODERATOR, name: 'Moderator' },
    { id: ROLES.USER, name: 'User' },
  ]
}

export async function deleteUser(userId) {
  return User.deleteOne({ _id: userId })
}

export async function updateUser(id, userData) {
  return User.findByIdAndUpdate(id, userData, { returnDocument: 'after' })
}
