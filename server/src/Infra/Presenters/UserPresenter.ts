import User from "../../Core/Domain/User/User";
import { IGuestPresenter } from "../../Core/UseCase/UserUseCase";

export class GuestPresenter implements IGuestPresenter {

    private output: { name: string, id: string };
    private error: string;
    
    Success(user: User) {
        this.output = { name: user.Name, id: user.Id };
        return;
    }

    GetOutput() {
        return this.output;
    }

    Fail(error: string) {
        this.error = error;
    }


    GetError() {
        return this.error;
    }

}