import jwt from 'jsonwebtoken'
const sign = process.env.JWT_SECRET

export function generateToken(data) {
  return jwt.sign(data, sign, { expiresIn: '7d' })
}

export function verifyToken(token) {
  return jwt.verify(token, sign)
}
