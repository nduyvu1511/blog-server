import express, { NextFunction } from "express"
import User from "../models/author"

export const getUser = async (req: express.Request, res: express.Response, next: NextFunction) => {
  const { authorId } = req.locals
  try {
    const user = await User.findById(authorId)
    if (!user) return res.json({ message: "user not found", success: false })
    req.locals = { user, authorId }
    return next()
  } catch (error) {
    return res.status(400).send(error)
  }
}
