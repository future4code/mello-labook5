import {BaseDatabase} from "./BaseDatabase";

export class FeedDatabase extends BaseDatabase {
  public async getFriendsId(userId: string): Promise<any> {
    const result = await this.getConnection().raw(`
      SELECT user_friend_id
      FROM Friends_Relations
      WHERE user_id = "${userId}"
    `)
    
    return result[0]
  } 

  // public async getFeed(creatorPostId: string): Promise<any> {
  //   const result = await this.getConnection().raw(`
  //     SELECT photo_url, description, created_at, type
  //     FROM Posts
  //     WHERE id = "${creatorPostId}"
  //   `);

  //   return result[0]
  // }

  public async getFeed(userId: string): Promise<any> {
    const result = await this.getConnection().raw(`
      SELECT 
        p.id AS postId,
        p.photo_url AS photoUrl,
        p.description,
        p.created_at AS createdAt,
        p.type,
        u.id AS creatorUserId,
        u.name AS creatorUserName
      FROM 
        Posts p JOIN User_Info u ON p.user_id = u.id
        JOIN Friends_Relations fr ON fr.user_friend_id = u.id
      WHERE 
        fr.user_id = "${userId}"
      ORDER BY p.created_at DESC  
    `);

    return result[0]
  }
}



