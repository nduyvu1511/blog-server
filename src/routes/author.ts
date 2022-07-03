import express from "express"
import AuthorController from "../app/controllers/author.controller"
import { verifyToken } from "../app/middlewares/token.middleware"

const router = express.Router()

router.get("/profile", verifyToken, AuthorController.getProfile)
router.post("/update_profile", verifyToken, AuthorController.updateProfile)

export default router
