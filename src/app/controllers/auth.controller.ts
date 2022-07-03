import bcrypt from "bcryptjs"
import express from "express"
import Author, { AuthorModel } from "../models/author"

class AuthController {
  async register(req: express.Request, res: express.Response) {
    const { email, name, password } = req.body
    if (!email || !password) return res.json({ message: "missing required fields", success: false })
    try {
      if (await Author.findOne({ email })) {
        return res.json({ message: "Email is duplicate, please login", success: false })
      }

      const pwHashed = await bcrypt.hash(password, 10)

      const newUser = new Author({
        ...req.body,
        name: name || email,
        password: pwHashed,
      })
      await newUser.save()
      return res.json({
        data: newUser,
        message: "Create author successfully",
        success: true,
      })
    } catch (error) {
      console.log(error)
      return res.status(400).send(error)
    }
  }

  async login(req: express.Request, res: express.Response) {
    const token = req.locals.token

    try {
      return res.json({
        data: { token },
        success: true,
        message: "successfully",
      })
    } catch (error) {
      return res.status(400).send(error)
    }
  }

  async changePassword(req: express.Request, res: express.Response) {
    const { user }: { user: AuthorModel } = req.locals
    const { current_password, new_password, confirm_password } = req.body

    try {
      if (!current_password || !new_password || !confirm_password)
        return res.json({ message: "missing required fields", success: false })

      if (confirm_password !== new_password)
        return res.json({
          message: "New password and current password must the same",
          success: false,
        })

      if (!(await bcrypt.compare(current_password, user.password)))
        return res.json({ message: "Password is incorrect", success: false })

      if (new_password === current_password)
        return res.json({
          message: "New password must different from current password",
          success: false,
        })

      const password = await bcrypt.hash(new_password, 10)
      await Author.findByIdAndUpdate(
        user._id,
        {
          $set: {
            password,
          },
        },
        {
          new: true,
        }
      )

      return res.json({
        message: "Change password successfully",
        success: true,
      })
    } catch (error) {
      return res.status(400).send(error)
    }
  }
}

export default new AuthController()
