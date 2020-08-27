import moment from "moment";

import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { PostDatabase } from "../data/PostDatabase";
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

        const posts: any[] = []
        const feed: any[] = []

        const friendId = new FeedDatabase()
        friendId.getFriendId(authenticationData.id)
        posts.push(friendId)
        
        const postsFriends: any[] = await posts.map((id: string) => {
          return feed.push(friendId.getFeed(id))
        })

        return feed
    }

    public async getPostsType(token: string, type: string): Promise<any> {
        const authenticationData = Authenticator.getData(token)
        if (!authenticationData) {
            throw new Error("User must be logged");
        }

        const postsType = new PostDatabase()
        const result = await postsType.getPostType(type)

        return result
    }
}