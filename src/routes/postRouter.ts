import express from "express"
import { PostController } from "../controller/PostController"

export const postRouter = express.Router()

postRouter.post("/create", new PostController().createPost)
postRouter.get("/feed", new PostController().feedPost)
postRouter.get("/feed/:type", new PostController().postsByType)
postRouter.put("/like/:id", new PostController().likePost)
postRouter.post("/comment", new PostController().commentPost)
postRouter.delete("/dislike/:id", new PostController().dislikePost)

