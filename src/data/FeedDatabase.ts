import {BaseDatabase} from "./BaseDatabase";

export class FeedDatabase extends BaseDatabase {
  
  public async getFeed(userId: string, postPerPage: number, offset: number): Promise<any> {
    const result = await this.getConnection().raw(`
      SELECT 
        p.id AS postId,
        p.photo_url AS photoUrl,
        p.description,
        p.created_at AS createdAt,
        p.type,
        u.id AS creatorUserId,
        u.name AS creatorUserName,
        (SELECT COUNT(1) FROM Posts_Like pl WHERE pl.post_id = p.id) as likesCount,
        (SELECT COUNT(1) FROM Comments c WHERE c.post_id = p.id) as commentsCount
      FROM 
        Posts p JOIN User_Info u ON p.user_id = u.id
        JOIN Friends_Relations fr ON fr.user_friend_id = u.id
      WHERE 
        fr.user_id = "${userId}"
      ORDER BY p.created_at DESC
      LIMIT ${postPerPage}
      OFFSET ${offset}  
    `);

    return result[0]
  }
}



