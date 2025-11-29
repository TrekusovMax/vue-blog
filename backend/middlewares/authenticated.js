import { verifyToken } from '../helpers/token.js'
import { User } from '../models/User.js'

export default async function (req, res, next) {
  const tokenData = verifyToken(req.cookies.token)
  const user = await User.findOne({ _id: tokenData.id })

  if (!user) {
    return res.status(401).send({ error: 'Unauthorized' })
  }
  req.user = user
  next()
}
