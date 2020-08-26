import express from "express";
import dotenv from "dotenv";
import { AddressInfo } from "net";
import { UserController } from "./controller/UserController";
import { UserDatabase } from "./data/UserDatabase";
import { UserBusiness } from "./business/UserBusiness";
import { UsersRelationDatabase } from "./data/UsersRelationDatabase";

dotenv.config()
const app = express();
app.use(express.json());

app.post("/signup", new UserController().signup)
app.post("/login", new UserController().login)
app.post("/users/connect", new UserController().makeFriendship)
app.delete("/users/disconnect", new UserController().undoFriendship)



const server = app.listen(3000, () => {
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost: ${address.port}`);
    } else {
        console.error(`Failure upon starting server.`);
    }
});



