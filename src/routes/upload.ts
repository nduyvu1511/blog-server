import express from "express"
import uploadController from "../app/controllers/upload.controller"
import { verifyToken } from "../app/middlewares/token.middleware"

const router = express.Router()

router.post("/", verifyToken, uploadController.uploadImage)

export default router
