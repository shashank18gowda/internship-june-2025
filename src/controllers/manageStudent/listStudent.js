import { Router } from "express";
const router = Router();
import studentModel from "../../models/studentModel.js";
import RESPONSE from "../../config/global.js";
import { send, setErrMsg } from "../../helper/responseHelper.js";
import { STATE } from "../../config/constants.js";

export default router.get("/", async (req, res) => {
  try {
    let student_id = req.query.student_id;

    let query = {
      isactive: STATE.ACTIVE,
    };

    student_id != undefined ? (query._id = student_id) : "";

    let studentData = await studentModel.find(query, {
      isactive: 0,
      __v: 0,
    });

    // let studentData = await studentModel.aggregate([
    //   {
    //     $match: {
    //       isactive: STATE.ACTIVE,
    //     },
    //   },
    //   {
    //     $project: {
    //       isactive: 0,
    //       __v: 0,
    //     },
    //   },
    // ]);

    if (studentData.length == 0) {
      return send(res, setErrMsg(RESPONSE.NOT_FOUND, "student data"));
    }

    return send(res, RESPONSE.SUCCESS, studentData);
  } catch (error) {
    console.log("list student", error);
    return send(res, RESPONSE.UNKNOWN_ERR);
  }
});
