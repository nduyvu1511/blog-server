import express from "express"
import categoryController from "../app/controllers/category.controller"
import { verifyToken } from "../app/middlewares/token.middleware"

const router = express.Router()

router.post("/add", verifyToken, categoryController.createCategory)
router.post("/update", verifyToken, categoryController.updateCategory)
router.post("/delete", verifyToken, categoryController.deleteCategory)
router.get("/", categoryController.getCategories)
router.get("/options", categoryController.getCategoryOptions)

export default router
