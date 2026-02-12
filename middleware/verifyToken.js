import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
config()

export const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token

    if (token === undefined) {
      return res.status(401).json({ message: "Unauthorized, please login" })
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

    // attach user info to request
    req.user = decodedToken

    next()
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token",
      reason: err.message
    })
  }
}