import { Type } from "../models/models.js";
class TypeController {
  async create(req, res) {
    const { name } = req.body;
    const type = await Type.create({ name });
    return res.json(type);
  }

  async getAll(req, res) {
    const types = await Type.findAll()
    return res.json(types);
  }
}

export default new TypeController();
