import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { UsersRelationDatabase } from "../data/UsersRelationDatabase";
import { PostDatabase } from "../data/PostDatabase";
import moment from "moment";
import { FeedDatabase } from "../data/FeedDatabase";

export class PostBusiness {

	public async createPost(
        token: string,
		photo: string,
        description: string,
        type: string
	): Promise<void> {
		if (!photo || !description || !type) {
			throw new Error("Please fill all the fields");
        }

        const authenticationData = Authenticator.getData(token)
        if (!authenticationData) {
            throw new Error("User must be logged");
        }
        
        const id = IdGenerator.generate();
        const date = moment()

		const postDB = new PostDatabase();
		return await postDB.createPost(id, photo, description, date, type, authenticationData.id);

    }

    public async getFeed(token: string): Promise<any> {
        const authenticationData = Authenticator.getData(token)
        if (!authenticationData) {
            throw new Error("User must be logged");
        }

        const userId = new FeedDatabase()
        const user: any[] = []
        userId.getFriendId(authenticationData.id)
        user.push(userId)
        
        user.map((id: string) => {
          
        })
    }
}