import { BaseDatabase } from "./BaseDatabase"

export class LikeDatabase extends BaseDatabase {
    private static TABLE_NAME = "Posts_Like"
    
    public async likePost(postId: string, userId: string): Promise<void> {
        await this.getConnection()
          .insert({
            post_id: postId,
            user_id: userId
          })
          .into(LikeDatabase.TABLE_NAME)
      }
} 