import express from "express"
import { convertViToEn } from "../../helpers/functions"
import Category, { CategoryModel, CategoryRes, ICategory } from "../models/category"
import Post from "../models/post"

class CategoryController {
  async createCategory(req: express.Request, res: express.Response) {
    try {
      const data: ICategory = req.body
      if (!data?.name || !data?.slug) {
        return res.json({ message: "Mising required fields", success: false })
      }
      const slug = convertViToEn(data.slug.trim().toLowerCase()).replace(/\s+/g, "-")
      if (await Category.findOne({ slug })) {
        return res.json({ message: "Slug is duplicate", success: false })
      }
      const category = new Category({
        ...data,
        slug,
      })
      await category.save()

      const categoryRes: CategoryRes = {
        categoryId: category._id,
        desc: category?.desc || "",
        image: category?.image || "",
        parentId: category?.parentId || "",
        slug: category.slug,
        name: category.name,
        createdAt: category.createdAt,
        postCount: 0,
      }

      return res.json({
        data: categoryRes,
        success: true,
        message: "Congratulations",
      })
    } catch (error) {
      return res.status(400).send(error)
    }
  }

  async deleteCategory(req: express.Request, res: express.Response) {
    try {
      const { categoryId } = req.body
      if (!categoryId) {
        return res.json({ message: "missing category id", success: false })
      }

      const posts = await Post.countDocuments({ categoryId })
      if (posts > 0) {
        return res.json({
          message: "You can not delete this category because it contains posts",
          success: false,
        })
      }
      await Category.findByIdAndRemove(categoryId)
      return res.json({
        data: { categoryId },
        success: true,
        message: "Congratulations",
      })
    } catch (error) {
      return res.status(400).send(error)
    }
  }

  async updateCategory(req: express.Request, res: express.Response) {
    try {
      const { categoryId, ...data } = req.body
      if (!Object.keys(data).length) {
        return res.json({ message: "Nothing to update", success: false })
      }
      if (!categoryId) {
        return res.json({ message: "missing category id", success: false })
      }
      if (data?.slug) {
        data.slug = convertViToEn(data.slug.trim().toLowerCase()).replace(/\s+/g, "-")
      }
      await Category.findByIdAndUpdate(categoryId, data, { new: true })
      return res.json({
        data,
        success: true,
        message: "Congratulations",
      })
    } catch (error) {
      return res.status(400).send(error)
    }
  }

  async getCategories(req: express.Request, res: express.Response) {
    const categories: CategoryModel[] = (await Category.find().lean()) || []
    const newCategories = await Promise.all(
      categories.map(async (item: CategoryModel) => {
        const postCount =
          (await Post.countDocuments({ $and: [{ categoryId: item._id }, { active: true }] })) || 0
        return {
          categoryId: item._id,
          createdAt: item.createdAt,
          desc: item?.desc || "",
          image: item?.image || "",
          parentId: item?.parentId || "",
          postCount,
          slug: item.slug,
          name: item.name,
        } as CategoryRes
      })
    )

    try {
      return res.json({
        data: newCategories,
        success: true,
        message: "Congratulations",
      })
    } catch (error) {
      return res.status(400).send(error)
    }
  }

  async getCategoryOptions(req: express.Request, res: express.Response) {
    const categories: CategoryModel[] =
      (await Category.find()
        .select(["categoryId", "createdAt", "image", "slug", "desc", "name", "parentId"])
        .lean()) || []

    const newCategories = await Promise.all(
      categories.map(async (item: CategoryModel) => {
        return {
          categoryId: item._id,
          createdAt: item.createdAt,
          desc: item?.desc || "",
          image: item?.image || "",
          parentId: item?.image || "",
          slug: item.slug,
          name: item.name,
        } as CategoryRes
      })
    )

    try {
      return res.json({
        data: newCategories,
        success: true,
        message: "Congratulations",
      })
    } catch (error) {
      return res.status(400).send(error)
    }
  }
}
export default new CategoryController()
