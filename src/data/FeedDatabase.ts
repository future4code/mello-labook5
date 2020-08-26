import {BaseDatabase} from "./BaseDatabase";

export class FeedDatabase extends BaseDatabase {
  public async getFriendId(userId: string): Promise<any> {
    const result = await this.getConnection().raw(`
      SELECT user_friend_id
      FROM Friends_Relation
      WHERE user_id = "${userId}"
    `)

    return result[0]
  } 

  public async getFeed(creatorPostId: string): Promise<any> {
    const result = await this.getConnection().raw(`
      SELECT photo_url, description, created_at, type
      FROM Posts
      WHERE id = "${creatorPostId}"
    `);

    return result[0]
  }
}



