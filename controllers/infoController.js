import { User } from "../models/models.js";
class infoController {

    async getAllUsers(req, res) {
        const users = await User.findAll();
        return res.json(users);
    }
}

export default new infoController();