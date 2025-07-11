import { Router } from "express";
const router = Router();
import studentModel from "../../models/studentModel.js";
import RESPONSE from "../../config/global.js";
import { send, setErrMsg } from "../../helper/responseHelper.js";

export default router.put("/", async (req, res) => {
  try {
    let { name, email } = req.body || {};

    let student_id = req.query.student_id;

    if (!student_id || student_id == undefined) {
      return send(res, setErrMsg(RESPONSE.REQUIRED, "student_id"));
    }

    let updates = {};

    if (name && name != undefined) {
      updates.name = name;
    }
    if (email && email != undefined) {
      let isEmail = email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

      if (!isEmail) {
        return send(res, setErrMsg(RESPONSE.INVALID, "email"));
      }

      let isEmailExist = await studentModel.findOne({
        email: email,
        _id: { $ne: student_id },
      });

      if (isEmailExist) {
        return send(res, setErrMsg(RESPONSE.ALRDY_EXISTS, "email"));
      }

      updates.email = email;
    }

    await studentModel.updateMany(
      {
        _id: student_id,
      },
      {
        $set: updates,
      }
    );

    return send(res, RESPONSE.SUCCESS);
  } catch (error) {
    console.log("edit student", error);
    return send(res, RESPONSE.UNKNOWN_ERR);
  }
});
