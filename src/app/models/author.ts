import mongoose from "mongoose"
import { EMAIL_REGEX, URL_REGEX } from "../../helpers/constant"
import { validateEmail, validateUrl } from "../../helpers/functions"

const Author = new mongoose.Schema(
  {
    name: { type: String, required: true },
    avatar: {
      type: String,
      required: false,
      validate: [validateUrl, "Invalid image url"],
      match: [URL_REGEX, "Invalid image url"],
    },
    bio: { type: String },
    email: {
      type: String,
      required: true,
      validate: [validateEmail, "Invalid email"],
      match: [EMAIL_REGEX, "Invalid email"],
      unique: true,
    },
    password: { type: String, min: 6, required: true },
  },

  { timestamps: true }
)

export interface AuthorModel {
  _id: string
  name: string
  avatar: string
  bio: string
  email: string
  password: string
}

export interface AuthorRes {
  authorId: string
  name: string
  avatar: string
  bio: string
  email: string
}

export default mongoose.model("author", Author)
