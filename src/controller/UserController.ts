import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { BaseDatabase } from "../data/BaseDatabase";

export class UserController {
    async signup(req: Request, res: Response) {
        try {
            const userBusiness: UserBusiness = new UserBusiness()
    
            const { name, email, password, device } = req.body

            const response = await userBusiness.signup(name, email, password, device)

            res.status(200).send({
                token: response.accessToken,
                refreshToken: response.refreshToken
            })  
        } catch (error) {
            res.status(400).send({
                error: error.sqlMessage || error.message
            })
        }
        await BaseDatabase.destroyConnection()
    }

    async login(req: Request, res: Response) {
        try {
            const userBusiness: UserBusiness = new UserBusiness()
    
            const { email, password, device } = req.body

            const response = await userBusiness.login(email, password, device)

            res.status(200).send({
                token: response.accessToken,
                refreshToken: response.refreshToken
            })   
        } catch (error) {
            res.status(400).send({
                error: error.sqlMessage || error.message
            })
        }
        await BaseDatabase.destroyConnection()
    }

    async makeFriendship(req: Request, res: Response) {
        try{
            const userBusiness: UserBusiness = new UserBusiness()

            const token = req.headers.authorization as string
            
            await userBusiness.makeFriendship(token, req.body.friendId)

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

    async undoFriendship(req: Request, res: Response) {
        try{
            const userBusiness: UserBusiness = new UserBusiness()

            const token = req.headers.authorization as string
            
            await userBusiness.undoFriendship(token, req.body.friendId)

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

    async refreshToken(req: Request, res: Response) {
        try {
            const userBusiness: UserBusiness = new UserBusiness();
            
            const refreshToken = req.body.refreshToken;
            const device = req.body.device

            const accessToken = await userBusiness.getRefreshToken(refreshToken, device);

            res.status(200).send({
                accessToken
            })
        } catch (error) {
            res.status(400).send({
                error: error.sqlMessage || error.message
            })
        }

        await BaseDatabase.destroyConnection()
    }
}