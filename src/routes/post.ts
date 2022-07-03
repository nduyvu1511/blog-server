import express from "express"
import PostController from "../app/controllers/post.controller"
import { verifyToken } from "../app/middlewares/token.middleware"

const router = express.Router()

router.post("/add", verifyToken, PostController.createPost)
router.post("/delete", verifyToken, PostController.deletePost)
router.post("/restore", verifyToken, PostController.restorePost)
router.post("/update", verifyToken, PostController.updatePost)
router.get("/", PostController.getPosts)
router.get("/:postId", PostController.getPostDetail)
router.get("/category/:categoryId", PostController.getPostsByCategory)

export default router
