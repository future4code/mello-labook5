import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { UsersRelationDatabase } from "../data/UsersRelationDatabase";

export class UserBusiness {
	public async signup(
		name: string,
		email: string,
		password: string
	): Promise<string> {
		const userDB = new UserDatabase();

		if (!name || !email || !password) {
			throw new Error("Please fill all the fields");
		}

		if (email.indexOf("@") === -1) {
			throw new Error("Invalid Email");
		}

		if (password.length < 6) {
			throw new Error("Password must have at least 6 characters");
		}


		const id = IdGenerator.generate();
		const hashPassword = await HashManager.hash(password);

		
		await userDB.registerUser(id, name, email, hashPassword);

		const token = Authenticator.generateToken({ id });

		return token;
	}

	public async login(email: string, password: string): Promise<string> {
		const userDB = new UserDatabase();
		const user = await userDB.getUserByEmail(email);

		const correctPassword = await HashManager.compare(
			password,
			user.password
		);

		if (!correctPassword) {
			throw new Error("Incorrect email or password");
		}

        const token = Authenticator.generateToken({ id: user.id });
        
        return token
    }
    
    public async makeFriendship(token: string, friendId: string): Promise<void> {
		
		if(!token) {
			throw new Error("User must be logged")
		}
		
		if (!friendId) {
			throw new Error("Friend id must be informed");
		}

		const authenticationData = Authenticator.getData(token)

		const userRelationDB = new UsersRelationDatabase()
		const friendshipCheck = await userRelationDB.checkFriendhship(authenticationData.id, friendId)
		
		if (friendshipCheck) {
			throw new Error("Friendship already exist");
		}

        await userRelationDB.makeFriendship(authenticationData.id, friendId)
	}
	
	public async undoFriendship(token: string, friendId: string): Promise<void> {
		
		if(!token) {
			throw new Error("User must be logged")
		}

		if (!friendId) {
			throw new Error("Friend id must be informed");
		}
		
		const authenticationData = Authenticator.getData(token)

		const userRelationDB = new UsersRelationDatabase()
		const friendshipCheck = await userRelationDB.checkFriendhship(authenticationData.id, friendId)

		if (!friendshipCheck) {
			throw new Error("There is no friendship relation");
		}

        await userRelationDB.undoFriendship(authenticationData.id, friendId)
	}
}
