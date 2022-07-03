import authRouter from "./auth"
import { default as authorRouter, default as userRouter } from "./author"
import category from "./category"
import postRouter from "./post"
import uploadRouter from "./upload"

const route = (app: any) => {
  app.use("/api/auth", authRouter)
  app.use("/api/author", authorRouter)
  app.use("/api/user", userRouter)
  app.use("/api/post", postRouter)
  app.use("/api/category", category)
  app.use("/api/upload", uploadRouter)
}

export default route
