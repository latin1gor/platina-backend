import ApiError from "../error/ApiError.js";
import { Basket, User } from "../models/models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};
class UserController {
  async register(req, res, next) {
    const { email, password, role } = req.body;
    console.log('working')
    if (!email || !password) {
      return next(ApiError.badRequest("Incorrect password or email"));
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(ApiError.badRequest("User with this email is already exist"));
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, role, password: hashPassword });
    const basket = await Basket.create({ userId: user.id });
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token, user });
  }

  async login(req, res, next) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.internal("User is not found!"));
    }

    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal("Incorrect password"));
    }

    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.json({ token });
  }
}

export default new UserController();
