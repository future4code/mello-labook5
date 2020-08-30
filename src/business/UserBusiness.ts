import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { UsersRelationDatabase } from "../data/UsersRelationDatabase";
import { RefreshTokenDatabase } from "../data/RefreshTokenDatabase";

export class UserBusiness {
	public async signup(
		name: string,
		email: string,
		password: string,
		device: string
	): Promise<any> {
		const userDB = new UserDatabase();
		const refreshTokenDB = new RefreshTokenDatabase();

		if (!name || !email || !password || !device) {
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

		const accessToken = Authenticator.generateToken({ id }, "30s");
		await userDB.registerUser(id, name, email, hashPassword);

		const refreshToken = Authenticator.generateToken({ id, device }, "1y")
		await refreshTokenDB.createRefreshToken(refreshToken, device, true, id);

		const response = {
		  accessToken,
		  refreshToken
		}

		return response
	}

	public async login(email: string, password: string, device: string): Promise<any> {
		const userDB = new UserDatabase();
		const refreshTokenDB = new RefreshTokenDatabase();

		const user = await userDB.getUserByEmail(email);

		const correctPassword = await HashManager.compare(
			password,
			user.password
		);

		if (!correctPassword) {
			throw new Error("Incorrect email or password");
		}

		const accessToken = Authenticator.generateToken({ id: user.id }, "30s");

		const refreshToken = Authenticator.generateToken({ id: user.id, device }, "1y");

		const refreshTokenFromDB = await refreshTokenDB.getRefreshTokenByIdAndDevice(user.id, device);
		
		if (refreshTokenFromDB) {
		  await refreshTokenDB.deleteToken(refreshTokenFromDB.token)
		}

		await refreshTokenDB.createRefreshToken(refreshToken, device, true, user.id)

        const response = {
		  accessToken,
		  refreshToken
		}
  
		return response
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

	public async getRefreshToken (refreshToken: string, device: string): Promise<string> {
		const userDB = new UserDatabase();

		if(!refreshToken || !device) {
			throw new Error("User must be logged")
		}

		const refreshTokenData = Authenticator.getData(refreshToken)

		if (refreshTokenData.device !== device) {
			throw new Error("Refresh token has no device");
		}

		const user = await userDB.getUserById(refreshTokenData.id);

		const accessToken = Authenticator.generateToken({id: user.id})

		return accessToken;

	}
}
