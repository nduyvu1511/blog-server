import express from "express"
import { OBJECT_ID_REGEX } from "../../helpers/constant"
import Author, { AuthorModel } from "../models/author"
import Category, { CategoryModel } from "../models/category"
import Post, { PostDetailRes, PostModel, PostRes, RelatedPost } from "../models/post"

class PostController {
  async createPost(req: express.Request, res: express.Response) {
    const { authorId }: { authorId: string } = req.locals
    try {
      const { title, content, shortContent, categoryId, slug, thumbnail } = req.body
      if (!title || !content || !shortContent || !categoryId || !slug || !thumbnail)
        return res.json({ message: "missing required fields", success: false })

      if (!OBJECT_ID_REGEX.test(categoryId)) {
        return res.json({ message: "Invalid category id", success: false })
      }

      if (!(await Category.findById(categoryId))) {
        return res.json({ message: "Category not found", success: false })
      }

      if (await Post.findOne({ slug })) {
        return res.json({
          message: "Slug is duplicate, please choose a unique slug",
          success: false,
        })
      }

      const newPost = new Post({ ...req.body, authorId })
      await newPost.save()

      return res.json({
        message: "Create post successfully",
        success: true,
        data: newPost,
      })
    } catch (error) {
      console.log(error)
      return res.status(400).send(error)
    }
  }

  async deletePost(req: express.Request, res: express.Response) {
    try {
      const { postId } = req.body
      if (!postId) return res.json({ message: "missing post id", success: false })
      await Post.findByIdAndUpdate(postId, { $set: { active: false } }, { new: true })

      return res.json({
        message: "delete post successfully",
        success: true,
        data: { postId },
      })
    } catch (error) {
      console.log(error)
      return res.status(400).send(error)
    }
  }

  async restorePost(req: express.Request, res: express.Response) {
    try {
      const { postId } = req.body
      if (!postId) return res.json({ message: "missing post id", success: false })
      await Post.findByIdAndUpdate(postId, { $set: { active: true } }, { new: true })

      return res.json({
        message: "restore post successfully",
        success: true,
        data: { postId },
      })
    } catch (error) {
      console.log(error)
      return res.status(400).send(error)
    }
  }

  async updatePost(req: express.Request, res: express.Response) {
    try {
      const { postId, ...params } = req.body
      if (!postId) return res.json({ message: "missing post id", success: false })
      if (!Object.keys(params)?.length) {
        return res.json({ message: "Nothing to update", success: false })
      }
      await Post.findByIdAndUpdate(postId, params, { new: true })

      return res.json({
        message: "update post successfully",
        success: true,
        data: { postId },
      })
    } catch (error) {
      console.log(error)
      return res.status(400).send(error)
    }
  }

  async getPosts(req: express.Request, res: express.Response) {
    const limit = Number(req.query?.limit) || 12
    const offset = Number(req.query?.offset) || 0
    const { categoryId } = req.query
    try {
      const query = categoryId ? { categoryId, active: true } : { active: true }
      const posts: PostModel[] =
        (await Post.find(query)
          .select([
            "_id",
            "title",
            "thumbnail",
            "subTitle",
            "shortContent",
            "Id",
            "slug",
            "categoryId",
            "createdAt",
            "updatedAt",
            "authorId",
          ])
          .limit(limit)
          .skip(limit * offset)
          .sort({ createdAt: -1 })
          .lean()) || []

      const newPosts = await Promise.all(
        posts.map(async (item) => {
          const author: AuthorModel | null = await Author.findById(item.authorId)
          const category: CategoryModel | null = await Category.findById(item.categoryId)
          return {
            postId: item._id,
            category: {
              categoryId: item.categoryId,
              categoryName: category?.name || "",
            },
            content: item.content,
            shortContent: item.shortContent,
            slug: item.slug,
            subTitle: item.subTitle,
            tags: item?.tags || [],
            thumbnail: item.thumbnail,
            title: item.title,
            author: {
              authorId: item.authorId,
              authorName: author?.name,
            },
            createdAt: item.createdAt,
          } as PostRes
        })
      )

      return res.json({
        message: "Congratulations",
        success: true,
        data: newPosts,
      })
    } catch (error) {
      console.log(error)
      return res.status(400).send(error)
    }
  }

  async getPostDetail(req: express.Request, res: express.Response) {
    try {
      const { postId } = req.params
      const { slug } = req.query
      if (!postId && !slug) return res.json({ message: "Missing post id", success: false })
      const query = postId ? { _id: postId } : { slug }
      const post: PostModel | null = await Post.findOne(query)
      if (!post || !post.active) return res.json({ message: "Post not found", success: false })

      const author: AuthorModel | null = await Author.findById(post?.authorId)
      const category: CategoryModel | null = await Category.findById(post?.categoryId)

      const postRes: PostDetailRes = {
        postId,
        title: post.title,
        shortContent: post.shortContent,
        content: post?.content || "",
        thumbnail: post.thumbnail,
        slug: post.slug,
        subTitle: post.subTitle,
        tags: post?.tags || [],
        createdAt: post?.createdAt || "",
        author: {
          authorId: author?._id || "",
          authorName: author?.name || "",
        },
        category: {
          categoryId: post?.categoryId || "",
          categoryName: category?.name || "",
        },
      }
      if (postId)
        return res.json({
          message: "Congratulations",
          success: true,
          data: postRes,
        })

      const relatedPostsRes: PostModel[] =
        (await Post.find({
          $and: [{ categoryId: post.categoryId }, { _id: { $ne: postId } }],
        })
          .select([
            "_id",
            "slug",
            "thumbnail",
            "shortTitle",
            "shortContent",
            "createdAt",
            "categoryId",
            "authorId",
          ])
          .sort({ createdAt: -1 })
          .limit(8)
          .lean()) || []
      const relatedPosts: RelatedPost[] = relatedPostsRes.map((item) => ({
        postId: item._id,
        slug: item.slug,
        subTitle: item.subTitle,
        shortContent: item.shortContent,
        thumbnail: item.thumbnail,
        createdAt: item.createdAt,
      }))

      return res.json({
        message: "Congratulations",
        success: true,
        data: { ...postRes, relatedPosts },
      })
    } catch (error) {
      console.log(error)
      return res.status(400).send(error)
    }
  }

  async getPostsByCategory(req: express.Request, res: express.Response) {
    const limit = Number(req.query?.limit) || 12
    const offset = Number(req.query?.offset) || 0
    try {
      const { categoryId } = req.params
      if (!categoryId) return res.json({ message: "Missing post id", success: false })
      const posts: PostModel[] = await Post.find({
        $and: [{ categoryId }, { active: true }],
      })
        .select([
          ,
          "postId",
          "title",
          "shortContent",
          "content",
          "thumbnail",
          "slug",
          "subTitle",
          "tags",
          "createdAt",
          "categoryId",
          "authorId",
        ])
        .sort({ createdAt: -1 })
        .skip(offset * limit)
        .limit(limit)
        .lean()

      const postsRes = await Promise.all(
        posts.map(async (item) => {
          const author: AuthorModel | null = await Author.findById(item?.authorId)
          const category: CategoryModel | null = await Category.findById(item?.categoryId)
          return {
            postId: item._id,
            title: item.title,
            shortContent: item.shortContent,
            content: item?.content || "",
            thumbnail: item.thumbnail,
            slug: item.slug,
            subTitle: item.subTitle,
            tags: item?.tags || [],
            createdAt: item?.createdAt || "",
            author: {
              authorId: item.authorId,
              authorName: author?.name || "",
            },
            category: {
              categoryId: item?.categoryId || "",
              categoryName: category?.name || "",
            },
          } as PostRes
        })
      )

      return res.json({
        message: "Congratulations",
        success: true,
        data: postsRes,
      })
    } catch (error) {
      console.log(error)
      return res.status(400).send(error)
    }
  }
}

export default new PostController()
