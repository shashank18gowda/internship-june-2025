import { Router } from "express";
const router = Router();
import teacherModel from "../../models/teacherModel.js";
import RESPONSE from "../../config/global.js";
import { send, setErrMsg } from "../../helper/responseHelper.js";
import bcrypt from "bcrypt";

export default router.post("/", async (req, res) => {
  try {
    let { username, password } = req.body || {};

    if (!username || username == undefined) {
      return send(res, setErrMsg(RESPONSE.REQUIRED, "username"));
    }

    if (!password || password == undefined) {
      return send(res, setErrMsg(RESPONSE.REQUIRED, "password"));
    }

    let userdata = await teacherModel.findOne({
      email: username,
    });

    if (userdata && (await bcrypt.compare(password, userdata.password))) {
      return send(res, RESPONSE.SUCCESS);
    } else {
      return send(res, setErrMsg(RESPONSE.INVALID, "Login credential"));
    }
  } catch (error) {
    console.log("login", error);
    return send(res, RESPONSE.UNKNOWN_ERR);
  }
});
