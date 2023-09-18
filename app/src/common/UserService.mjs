import User from "../models/User.js";

class UserService {

    static instance = null;

    constructor (user) {
        if (!UserService.instance) {
            UserService.instance = this;
            this.user = user;
        }

        return UserService.instance;
    }

    async fromDataBase(username){
        this.user = await User.fromDatabase(username)
        return this.user
    }


}

export default UserService;
