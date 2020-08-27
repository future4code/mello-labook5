import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { PostBusiness } from "../business/PostBusiness";

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
            const page = Number(req.query.page)
            
            const feed = await feedPost.getFeed(token, page)

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

    async postsByType(req: Request, res: Response) {
        try {
            const typePost = new PostBusiness()
    
            const token = req.headers.authorization as string
            const type = req.params.type
            const page = Number(req.query.page)
            
            const feed = await typePost.getPostsByType(token, type, page)

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

            res.status(200).send({message: "Success"})
        } catch (error) {
            res.status(400).send({
                error: error.sqlMessage || error.message
            })
        }
        await BaseDatabase.destroyConnection()
    }

    async dislikePost(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string


            const postBusiness: PostBusiness = new PostBusiness()
            await postBusiness.dislikePost(req.params.id, token)

            res.status(200).send({message: "Success"})
        } catch (error) {
            res.status(400).send({
                error: error.sqlMessage || error.message
            })
        }
        await BaseDatabase.destroyConnection()
    }
}