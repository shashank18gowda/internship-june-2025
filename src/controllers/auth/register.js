import { Router } from "express";
const router = Router();
import teacherModel from "../../models/teacherModel.js";
import RESPONSE from "../../config/global.js";
import { send, setErrMsg } from "../../helper/responseHelper.js";
import bcrypt from "bcrypt";

export default router.post("/", async (req, res) => {
  try {
    let { name, password, email } = req.body || {};

    if (!name || name == undefined) {
      // return res.send(RESPONSE.REQUIRED);
      return send(res, setErrMsg(RESPONSE.REQUIRED, "name"));
    }

    if (!email || email == undefined) {
      return send(res, setErrMsg(RESPONSE.REQUIRED, "email"));
    }

    let isEmail = email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

    if (!isEmail) {
      return send(res, setErrMsg(RESPONSE.INVALID, "email"));
    }

    if (!password || password == undefined) {
      return send(res, setErrMsg(RESPONSE.REQUIRED, "password"));
    }

    let isEmailExist = await teacherModel.findOne({
      email: email,
    });

    if (isEmailExist) {
      return send(res, setErrMsg(RESPONSE.ALRDY_EXISTS, "email"));
    }

    let isPassword = password.match(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    );

    if (!isPassword) {
      return send(res, setErrMsg(RESPONSE.INVALID, "password"));
    }

    let encryptedPass = await bcrypt.hash(password, 10);

    await teacherModel.create({
      name: name,
      password: encryptedPass,
      email: email,
    });

    return send(res, RESPONSE.SUCCESS);
  } catch (error) {
    console.log("register", error);
    return send(res, RESPONSE.UNKNOWN_ERR);
  }
});
