import moment from "moment";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { PostDatabase } from "../data/PostDatabase";
import { FeedDatabase } from "../data/FeedDatabase";
import { LikeDatabase } from "../data/LikeDatabase";

export class PostBusiness {

	public async createPost(
        token: string,
		photo: string,
        description: string,
        type: string
	): Promise<any> {
		if (!photo || !description || !type) {
			throw new Error("Please fill all the fields");
        }

        if (!token) {
            throw new Error("User must be logged");
        }

        const authenticationData = Authenticator.getData(token)
        
        const id = IdGenerator.generate();
        const date = moment()

		const postDB = new PostDatabase();
		return await postDB.createPost(id, photo, description, date, type, authenticationData.id);

    }

    public async getFeed(token: string): Promise<any[]> {
        const authenticationData = Authenticator.getData(token)
        
        if (!token) {
            throw new Error("User must be logged");
        }

        const feedDB = new FeedDatabase()
        
        const posts = await feedDB.getFeed(authenticationData.id)
        
        if (posts) {
            const feed: any[] = []
            for (let post of posts) {
                post.createdAt = moment(post.createdAt).format("DD/MM/YYYY")
                 
                feed.push(post)
            }
            return feed
        } else {
            return []
        }
    }

    public async getPostsByType(token: string, type: string): Promise<any> {
        const authenticationData = Authenticator.getData(token)
        if (!authenticationData) {
            throw new Error("User must be logged");
        }

        const postsType = new PostDatabase()
        const result = await postsType.getPostByType(type)

        if (result) {
            const feed: any[] = []
            for (let post of result) {
                post.createAt = moment(post.createAt).format("DD/MM/YYYY")
                 
                feed.push(post)
            }
            return feed
        } else {
            return []
        }
    }

    public async likePost(postId: string, token: string): Promise<void> {
        const authenticationData = Authenticator.getData(token)
        
        if (!token) {
            throw new Error("User must be logged");
        }

        if (!postId) {
            throw new Error("Post it must be informed");
        }

        const likeDB = new LikeDatabase()
        await likeDB.likePost(postId, authenticationData.id)
    }

    public async dislikePost(postId: string, token: string): Promise<void> {
        const authenticationData = Authenticator.getData(token)
        
        if (!token) {
            throw new Error("User must be logged");
        }

        if (!postId) {
            throw new Error("Post it must be informed");
        }

        const dislikeDB = new LikeDatabase()
        await dislikeDB.dislikePost(postId, authenticationData.id)
    }
}