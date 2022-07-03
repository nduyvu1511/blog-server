import mongoose from "mongoose"

const Post = new mongoose.Schema(
  {
    title: { type: String, required: true },
    thumbnail: {
      type: String,
      required: true,
    },
    content: { type: String, required: true },
    shortContent: { type: String, required: true },
    authorId: { type: String, ref: "author", required: true },
    tagIds: [{ type: String, _id: false, ref: "tag", default: [] }],
    slug: { type: String, required: true },
    categoryId: { type: String, ref: "category", required: true },
    active: { type: Boolean, required: false, default: true },
  },
  { timestamps: true }
)

export interface IPost {
  title: string
  subTitle: string
  content: string
  shortContent: string
  authorId: string
  tags: string[]
  thumbnail: string
  slug: string
  createdAt: string
  categoryId: string
  active?: boolean
}

export interface PostRes {
  postId: string
  title: string
  subTitle: string
  content: string
  shortContent: string
  author: {
    authorId: string
    authorName: string
  }
  tags: string[]
  thumbnail: string
  slug: string
  category: {
    categoryId: string
    categoryName: string
  }
  createdAt: string
}

export interface PostDetailRes {
  postId: string
  title: string
  subTitle: string
  content: string
  shortContent: string
  author: {
    authorId: string
    authorName: string
  }
  tags: string[]
  thumbnail: string
  slug: string
  category: {
    categoryId: string
    categoryName: string
  }
  createdAt: string
  relatedPosts?: RelatedPost[]
}

export interface RelatedPost {
  postId: string
  slug: string
  thumbnail: string
  subTitle: string
  shortContent: string
  createdAt: string
}

export interface PostModel extends IPost {
  _id: string
}

export default mongoose.model("post", Post)
