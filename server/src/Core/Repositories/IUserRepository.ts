import User from "../Domain/User/User";

export default interface IUserRepository {
    Create(name: string): User;
    FindUserById(id: string): User | undefined;
    Save(user: User): void;
}