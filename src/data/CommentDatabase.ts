import {BaseDatabase} from "./BaseDatabase";

export class CommentDatabase extends BaseDatabase {
    private static TABLE_NAME = 'Comments';

    public async createComment(
        id: string, 
        comment: string, 
        postId: string, 
        userId: string
    ): Promise<any> {
        await this.getConnection()
        .insert({
            id,
            comment,
            post_id: postId,
            user_id: userId,
          }).into(CommentDatabase.TABLE_NAME)
    }
}