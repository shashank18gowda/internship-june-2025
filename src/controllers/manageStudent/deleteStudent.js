import { Router } from "express";
const router = Router();
import studentModel from "../../models/studentModel.js";
import RESPONSE from "../../config/global.js";
import { send, setErrMsg } from "../../helper/responseHelper.js";
import { STATE } from "../../config/constants.js";

export default router.delete("/", async (req, res) => {
  try {
    let student_id = req.query.student_id;

    if (!student_id || student_id == undefined) {
      return send(res, setErrMsg(RESPONSE.REQUIRED, "student_id"));
    }

    let studentData = await studentModel.findOne({
      _id: student_id,
      isactive: STATE.ACTIVE,
    });

    if (studentData) {
      await studentModel.deleteOne({
        _id: student_id,
      });
      //   await studentModel.updateOne(
      //     {
      //       _id: student_id,
      //     },
      //     {
      //       $set: { isactive: STATE.INACTIVE },
      //     }
      //   );
    } else {
      return send(res, setErrMsg(RESPONSE.NOT_FOUND, "student"));
    }

    return send(res, RESPONSE.SUCCESS);
  } catch (error) {
    console.log("delete student", error);
    return send(res, RESPONSE.UNKNOWN_ERR);
  }
});
