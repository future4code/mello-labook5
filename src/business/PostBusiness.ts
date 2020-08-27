import moment from "moment";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { PostDatabase } from "../data/PostDatabase";
import { FeedDatabase } from "../data/FeedDatabase";
import { LikeDatabase } from "../data/LikeDatabase";
import { CommentDatabase } from "../data/CommentDatabase";


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

    public async getFeed(token: string, page: number): Promise<any[]> {

        const authenticationData = Authenticator.getData(token)
        
        if (!token) {
            throw new Error("User must be logged");
        }

        if (!page || page < 1 || Number.isNaN(page)) {
          page = 1;
        }

        const postPerPage = 5
        const offset = postPerPage * (page - 1)

        const feedDB = new FeedDatabase()
        
        const posts = await feedDB.getFeed(authenticationData.id, postPerPage, offset)
        
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

    public async getPostsByType(token: string, type: string, page: number): Promise<any> {
        const authenticationData = Authenticator.getData(token)
        
        if (!token) {
            throw new Error("User must be logged");
        }

        if (!page || page < 1 || Number.isNaN(page)) {
            page = 1;
        }
  
        const postPerPage = 5
        const offset = postPerPage * (page - 1)

        const postsType = new PostDatabase()
        const result = await postsType.getPostByType(type, postPerPage, offset)

        if (result) {
            const feed: any[] = []
            for (let post of result) {
                post.createdAt = moment(post.createdAt).format("DD/MM/YYYY")
                 
                feed.push(post)
            }
            return feed
        } else {
            return []
        }
    }

    public async likePost(postId: string, token: string): Promise<void> {
        if (!token) {
            throw new Error("User must be logged");
        }
        
        const authenticationData = Authenticator.getData(token)
        

        if (!postId) {
            throw new Error("Post id must be informed");
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


    public async commentPost(comment: string, postId: string, token: string): Promise<void> {
        
        if (!token) {
            throw new Error("User must be logged");
        }
      
        const authenticationData = Authenticator.getData(token)

        if (!postId || !comment) {
            throw new Error("Please fill all the fields");
        }

        const id = IdGenerator.generate()

        const commentDB = new CommentDatabase()
        await commentDB.createComment(id, comment, postId, authenticationData.id)

    }
}