import { BaseDatabase } from "./BaseDatabase";

export class RefreshTokenDatabase extends BaseDatabase {
  private static TABLE_NAME = "RefreshToken"
  
  private convertBooleanToInt (response: boolean): number {
    let value;

    if (response === true) {
     return value = 1;
    }

    return value = 0;
  }

  private convertIntToBoolean (value: number): boolean {
    let response;

    if (value === 1) {
      return response = true;
    }

    return response = false;
  }

  public async createRefreshToken (
    token: string,
    device: string,
    isActive: boolean,
    userId: string
  ): Promise<void> {
    await this.getConnection()
      .insert({
        refresh_token: token,
        device,
        is_active: this.convertBooleanToInt(isActive),
        user_id: userId
      })
      .into(RefreshTokenDatabase.TABLE_NAME)
  }

  public async getRefreshToken (token: string): Promise<any> {
    const result = await this.getConnection().raw(`
      SELECT * FROM ${RefreshTokenDatabase.TABLE_NAME}
      WHERE refresh_token = ${token}
    `)

    const retrievedToken = result[0][0]

    return {
      token: retrievedToken.refresh_token,
      device: retrievedToken.device,
      isActive: this.convertIntToBoolean(retrievedToken.is_active),
      userId: retrievedToken.user_id 
    }
  }

  public async getRefreshTokenByIdAndDevice(id: string, device: string): Promise<any> {
    const result = await this.getConnection().raw(`
      SELECT * FROM ${RefreshTokenDatabase.TABLE_NAME}
      WHERE user_id = "${id}"
      AND device = "${device}"
    `);

    const retrievedToken = result[0][0];

    if (retrievedToken === undefined) {
      return undefined;
    }

    return {
      token: retrievedToken.refresh_token,
      device: retrievedToken.device,
      isActive: this.convertIntToBoolean(retrievedToken.is_active),
      userId: retrievedToken.user_id
    }
  }

  public async deleteToken(token: string): Promise<any> {
    await this.getConnection()
      .from(RefreshTokenDatabase.TABLE_NAME)
      .where({ refresh_token: token })
      .del()
  }
}
