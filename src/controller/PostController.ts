import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { PostBusiness } from "../business/PostBusiness";
import { PostDatabase } from "../data/PostDatabase";

export class PostController {
    async createPost(req: Request, res: Response) {
        try {
            const postBusiness: PostBusiness = new PostBusiness()
    
            const token = req.headers.authorization as string
            const { photoUrl, description, type } = req.body

            await postBusiness.createPost(token, photoUrl, description, type)

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

    async getPostsType(req: Request, res: Response) {
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

    async likePost(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string

            const postBusiness: PostBusiness = new PostBusiness()
            await postBusiness.likePost(req.params.id, token)

            res.sendStatus(200)
        } catch (error) {
            res.status(400).send({
                error: error.sqlMessage || error.message
            })
        }
        await BaseDatabase.destroyConnection()
    }

    async commentPost(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string
            const postBusiness: PostBusiness = new PostBusiness()

            await postBusiness.commentPost(req.body.comment, req.body.postId, token)

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
    
}