import express from "express"
import { UserController } from "../controller/UserController"

export const userRouter = express.Router()

userRouter.post("/signup", new UserController().signup)
userRouter.post("/login", new UserController().login)

userRouter.put("/connect", new UserController().makeFriendship)
userRouter.delete("/disconnect", new UserController().undoFriendship)

