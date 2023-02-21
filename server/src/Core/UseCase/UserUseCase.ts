import User from "../Domain/User/User";
import IUserRepository from "../Repositories/IUserRepository";

export default class UserUseCase {

    private repo: IUserRepository

    constructor(repo: IUserRepository) {
        this.repo = repo;
    }

    public async Create(name: string, presenter: IGuestPresenter) {
        let user = await this.repo.Create(name);
        presenter.Success(user);
        return;
    }

    public async Guest(name: string, presenter: IGuestPresenter) {
        let user = await this.repo.Create(name);
        presenter.Success(user);
        return;
    }

    public async UpdateName(input: { id: string, name: string }, presenter: IGuestPresenter) {
        let user = await this.repo.FindUserById(input.id);
        if (!user) {
            presenter.Fail("can't find user of this id");
            return;
        }
        user.SetName(input.name);
        await this.repo.Save(user);
        presenter.Success(user);
        return;
    }


}

export interface IGuestPresenter {
    Success(user: User): void;
    Fail(err: string): void;
}
