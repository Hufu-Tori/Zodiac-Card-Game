import { customAlphabet } from "nanoid";
import User from "../../Core/Domain/User/User";
import IUserRepository from "../../Core/Repositories/IUserRepository";

const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 6);

export default class UserRepository implements IUserRepository {

    private userMap: Map<string, User>;

    constructor() {
        this.userMap = new Map();
    }

    Create(name: string): User {
        let user = new User(nanoid(), name);
        this.userMap.set(user.Id, user);
        return user;
    }

    FindUserById(id: string): User | undefined {
        return this.userMap.get(id);
    }

    Save(user: User): void {
        this.userMap.get(user.Id)?.SetName(user.Name);
    }
}