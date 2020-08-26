import {BaseDatabase} from "./BaseDatabase";

export class UsersRelationDatabase extends BaseDatabase{
  private static TABLE_NAME = 'Users_Relation';

  public async makeFriendship(userId:string, friendId: string): Promise<void> {
    await this.getConnection()
      .insert({
        user_id: userId,
        user_friend_id: friendId
      }).into(UsersRelationDatabase.TABLE_NAME)
  }

  public async undoFriendship(userId:string, friendId: string): Promise<void> {
    await this.getConnection()
      .del()
      .from(UsersRelationDatabase.TABLE_NAME)
      .where({
        user_id: userId,
        user_friend_id: friendId
      });
  }
  
}