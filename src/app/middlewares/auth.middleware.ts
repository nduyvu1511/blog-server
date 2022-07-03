import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import express from "express"
import Author, { AuthorModel } from "../models/author"

export const loginMiddleWare = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { email, password } = req.body
  try {
    if (!password || !email) return res.json({ message: "Missing required field", success: false })

    if (!password) return res.json({ message: "Missing password", success: false })

    const user: null | AuthorModel = await Author.findOne({ email })
    if (!user) return res.json({ message: "User not found", success: false })

    if (!(await bcrypt.compare(password, user.password)))
      return res.json({ message: "Password is not match", success: false })

    const token = jwt.sign({ authorId: user._id }, process.env.JWT_SECRET as string)

    req.locals = { token }
    next()
  } catch (error) {
    return res.status(400).send(error)
  }
}
