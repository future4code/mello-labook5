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
    const result = await this.getConnection()
      .select('photo_url', 'description', 'created_at AS createAt', 'type')
      .from(PostDatabase.TABLE_NAME)
      .where({ type })
      .orderBy('created_at', 'DESC')
      .limit(postPerPage)
      .offset(offset)

    return result;
  }
}