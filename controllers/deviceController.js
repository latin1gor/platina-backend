import {Device, DeviceInfo} from "../models/models.js";
import * as uuid from "uuid";
import  path from "path";
import ApiError from "../error/ApiError.js";
const __dirname = path.resolve();
class DeviceController {
  async create(req, res) {
    try{
      let { name, price, typeId, brandId, info } = req.body;
      const img = req.file
      const imgPath = img.path.split("/").pop()
      const device = await Device.create({name, price, typeId, brandId, img: imgPath})

      if(info){
        info = JSON.parse(info)
        info.map(i => {
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id
          })
        })
      }

      return res.json(device)
    }catch (e){
      console.log(e)
      return res.json(e)
    }

  }

  async getAll(req, res) {
    let {brandId, typeId, limit, page} = req.query
    page = page || 1
    limit = limit || 8
    let offset = page * limit - limit
    let devices
    if(!brandId && !typeId){
      devices = await Device.findAndCountAll({limit, offset})
    }
    if(brandId && !typeId){
      devices = await Device.findAndCountAll({where:{brandId}, limit, offset})
    }
    if(!brandId && typeId){
      devices = await Device.findAndCountAll({where:{typeId}, limit, offset})

    }
    if(brandId && typeId){
      devices = await Device.findAndCountAll({where:{typeId, brandId}, limit, offset})
    }
  if (!brandId && !typeId && !limit && !page ) {
      devices = await Device.findAndCountAll()
  }

    return res.json(devices)
  }

  async getOne(req, res) {
    const {id} = req.params
    const device = await Device.findOne({
      where: {id},
      include: [{model: DeviceInfo, as: 'info'}]
    })

    return res.json(device)
  }
  async getAllCount(req, res) {
    const devices = await Device.findAndCountAll()
    return devices
  }
}

export default new DeviceController();
