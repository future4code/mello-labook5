import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";



export class UserBusiness {
    public async signup(name: string, email: string, password: string): Promise<string> {

        if (!name || !email || !password) {
            throw new Error("Please fill all the fields");
        }

        if(email.indexOf("@") === -1){
            throw new Error("Invalid Email");
        }
        
        if(password.length < 6){
            throw new Error("Password must have at least 6 characters");
        }

        const id = IdGenerator.generate()
        const hashPassword = HashManager.hash(password)

        const userDB = new UserDatabase()
        await userDB.registerUser(
            id,
            name,
            email,
            hashPassword
        )

        const token = Authenticator.generateToken({id})

        return token
    }


}