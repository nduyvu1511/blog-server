import mongoose from "mongoose"

const Tag = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true, trim: true, lowercase: true },
  },
  { timestamps: true }
)

export interface ITag {
  title: string
}

export default mongoose.model("Tag", Tag)
