import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { BaseDatabase } from "../data/BaseDatabase";

export class UserController {
    async signup(req: Request, res: Response) {
        try {
            const userBusiness: UserBusiness = new UserBusiness()
    
            const { name, email, password } = req.body

            const token = await userBusiness.signup(name, email, password)

            res.status(200).send({
                token: token
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
    
            const { email, password } = req.body

            const token = await userBusiness.login(email, password)

            res.status(200).send({
                token: token
            })  
        } catch (error) {
            res.status(400).send({
                error: error.sqlMessage || error.message
            })
        }
        await BaseDatabase.destroyConnection()
    }
}