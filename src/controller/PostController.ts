import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { PostBusiness } from "../business/PostBusiness";

export class PostController {
    async createPost(req: Request, res: Response) {
        try {
            const creatorPost = new PostBusiness()
    
            const token = req.headers.authorization as string
            const { photo, description, type } = req.body

            const post = await creatorPost.createPost(token, photo, description, type)

            res.status(200).send({
                message: "Success"
            })  
        } catch (error) {
            res.status(400).send({
                error: error.sqlMessage || error.message
            })
        }
        await BaseDatabase.destroyConnection()
    }

    async feedPost(req: Request, res: Response) {
        try {
            const feedPost = new PostBusiness()
    
            const token = req.headers.authorization as string
            
            const feed = await feedPost.getFeed(token)

            res.status(200).send({
                feed
            })  
        } catch (error) {
            res.status(400).send({
                error: error.sqlMessage || error.message
            })
        }
        await BaseDatabase.destroyConnection()
    }

    async getPostsTypet(req: Request, res: Response) {
        try {
            const typePost = new PostBusiness()
    
            const token = req.headers.authorization as string
            const type = req.params.type
            
            const feed = await typePost.getPostsType(token, type)

            res.status(200).send({
                feed
            })  
        } catch (error) {
            res.status(400).send({
                error: error.sqlMessage || error.message
            })
        }
        await BaseDatabase.destroyConnection()
    }
}