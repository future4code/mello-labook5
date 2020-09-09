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

    public async getPostComments(postId: string, userId: string, postPerPage: number, offset: number): Promise<any> {
        const response = await this.getConnection().raw(`
            SELECT c.id as commentId, c.comment, c.created_at, c.user_id, u.name
            FROM 
                Comments c JOIN User_Info u ON c.user_id = u.id
                JOIN Friends_Relations fr ON fr.user_friend_id = u.id
            WHERE fr.user_id = "${userId}" AND c.post_id = "${postId}"
            ORDER BY p.created_at DESC
            LIMIT ${postPerPage}
            OFFSET ${offset}
        `)

        return response[0]
    }
}
