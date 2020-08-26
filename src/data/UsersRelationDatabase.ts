import {BaseDatabase} from "./BaseDatabase";

export class UsersRelationDatabase extends BaseDatabase{
  private static TABLE_NAME = 'Friends_Relations';

  public async makeFriendship(userId:string, friendId: string): Promise<void> {
    await this.getConnection()
      .insert([
        { user_id: userId, user_friend_id: friendId },
        { user_id: friendId, user_friend_id: userId } 
      ]).into(UsersRelationDatabase.TABLE_NAME)
  }

  public async undoFriendship(userId:string, friendId: string): Promise<void> {
    await this.getConnection()
      .del()
      .from(UsersRelationDatabase.TABLE_NAME)
      .where({
        user_id: userId,
        user_friend_id: friendId
      })
      .orWhere({
        user_id: friendId,
        user_friend_id: userId
      })
  }

  public async checkFriendhship(userId: string, friendId: string): Promise<boolean> {
    const result = await this.getConnection()
      .count("user_id as count")
      .from(UsersRelationDatabase.TABLE_NAME)
      .where({
        user_id: userId,
        user_friend_id: friendId
      })
      .orWhere({
        user_id: friendId,
        user_friend_id: userId
      })

      return Boolean(result[0].count)
  }

}