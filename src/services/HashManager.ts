import * as bcrypt from "bcryptjs";

export class HashManager {

    public static async hash(text: string): Promise<string> {
        const rounds = 12;
        const salt = await bcrypt.genSalt(rounds);
        const result = await bcrypt.hash(text, salt);
        return result;
    }

    public static async compare(text: string, hash: string): Promise<boolean>{
        return await bcrypt.compare(text, hash);
    }
}