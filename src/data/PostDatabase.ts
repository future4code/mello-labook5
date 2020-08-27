import { BaseDatabase } from "./BaseDatabase";
import moment from "moment";


export class PostDatabase extends BaseDatabase {
  private static TABLE_NAME = 'Posts';

  public async createPost(
    id: string, 
    photo: string,
    description: string, 
    created_at: moment.Moment,
    type: string,
    creatorId: string
  ): Promise<void> {
    const date = moment(created_at, "DD/MM/YYYY")

    await this.getConnection()
      .insert({
        id,
        photo_url: photo,
        description,
        created_at: date.format("YYYY-MM-DD"),
        type,
        user_id: creatorId
      }).into(PostDatabase.TABLE_NAME)
  }

  public async getPostByType(type: string, postPerPage: number, offset: number): Promise<any> {
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
            p.type = "${type}"
          ORDER BY p.created_at DESC
          LIMIT ${postPerPage}
          OFFSET ${offset}
    `)

    return result[0];
  }
}