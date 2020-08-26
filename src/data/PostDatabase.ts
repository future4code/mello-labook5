import { BaseDatabase } from "./BaseDatabase";
import moment from "moment"

export class PostDatabase extends BaseDatabase {
  private static TABLE_NAME = 'Post';

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
        photo,
        description,
        create_at: date.format("YYYY-MM-DD"),
        type,
        creator_id: creatorId
      }).into(PostDatabase.TABLE_NAME)
  }

}