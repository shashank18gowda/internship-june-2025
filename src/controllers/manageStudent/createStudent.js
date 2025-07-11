import { Router } from "express";
const router = Router();
import studentModel from "../../models/studentModel.js";
import RESPONSE from "../../config/global.js";
import { send, setErrMsg } from "../../helper/responseHelper.js";

export default router.post("/", async (req, res) => {
  try {
    let { name, rollno, email } = req.body || {};

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

    if (!rollno || rollno == undefined) {
      return send(res, setErrMsg(RESPONSE.REQUIRED, "rollno"));
    }

    let isRollNo = await studentModel.findOne({
      rollno: rollno,
    });

    if (isRollNo) {
      return send(res, setErrMsg(RESPONSE.ALRDY_EXISTS, "rollno"));
    }

    let isEmailExist = await studentModel.findOne({
      email: email,
    });

    if (isEmailExist) {
      return send(res, setErrMsg(RESPONSE.ALRDY_EXISTS, "email"));
    }

    await studentModel.create({
      name: name,
      rollno: rollno,
      email: email,
    });

    return send(res, RESPONSE.SUCCESS);
  } catch (error) {
    console.log("create student", error);
    return send(res, RESPONSE.UNKNOWN_ERR);
  }
});
