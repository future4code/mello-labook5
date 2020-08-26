import express from "express"
import { PostController } from "../controller/UserController"

export const userRouter = express.Router()

userRouter.post("/create", new PostController().createPost)
userRouter.get("/feed", new PostController().getFeed)
