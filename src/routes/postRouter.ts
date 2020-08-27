import express from "express"
import { PostController } from "../controller/PostController"

export const postRouter = express.Router()

postRouter.post("/create", new PostController().createPost)
postRouter.get("/feed", new PostController().feedPost)
postRouter.get("/feed/:type", new PostController().getPostsType)
postRouter.put("/like/:id", new PostController().likePost)
