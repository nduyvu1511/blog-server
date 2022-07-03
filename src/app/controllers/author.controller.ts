import express from "express"
import Author, { AuthorModel, AuthorRes } from "../models/author"

class AuthorController {
  async getProfile(req: express.Request, res: express.Response) {
    try {
      const { authorId } = req.locals
      const user: AuthorModel | null = await Author.findById(authorId)
      if (!user) return res.json({ message: "user not found", success: false })

      const userInfo: AuthorRes = {
        authorId: user._id,
        name: user.name,
        avatar: user.avatar || "",
        bio: user.bio || "",
        email: user?.email || "",
      }
      return res.json({
        data: userInfo,
        success: true,
        message: "Congratulations",
      })
    } catch (error) {
      return res.status(400).send(error)
    }
  }

  async updateProfile(req: express.Request, res: express.Response) {
    try {
      const data: AuthorModel = req.body
      const { authorId } = req.locals
      await Author.findByIdAndUpdate(authorId, data, { new: true })

      return res.json({
        data,
        success: true,
        message: "update profile successfully",
      })
    } catch (error) {
      return res.status(400).send(error)
    }
  }
}
export default new AuthorController()
