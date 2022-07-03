import mongoose from "mongoose"

const Category = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    parentId: { type: String, ref: "category", required: false, default: "" },
    image: {
      type: String,
      default: "",
    },
    desc: { type: String, default: "" },
  },
  { timestamps: true }
)

export interface ICategory {
  createdAt: string
  name: string
  slug: string
  parentId: string
  image: string
  desc: string
}

export interface CategoryRes {
  categoryId: string
  name: string
  slug: string
  parentId: string
  image: string
  desc: string
  postCount: number
  createdAt: string
}

export interface CategoryModel extends ICategory {
  _id: string
}

export default mongoose.model("category", Category)
