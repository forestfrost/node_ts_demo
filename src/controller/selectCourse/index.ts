import { Course, SelectCourse, Student } from "@/dateBase/index";
import { SelectCourseAttributes } from "@/dateBase/models/selectCourse";
import { Request, Response } from "express";
import { Op } from "sequelize";
import { setErrorTemplate, setNormalTemplate, notUndefined } from "@/utils/common";

/**
 * @description 获取选课表
 */
export async function getSelectCourseList(req: Request, res: Response) {
  const { studentId, courseId } = req.query;
  if (typeof studentId !== "undefined" && !/\d+/.test(studentId as string)) {
    res.send(setErrorTemplate(1600, "studentId must be Integer"));
    return;
  }
  if (typeof courseId !== "undefined" && !/\d+/.test(courseId as string)) {
    res.send(setErrorTemplate(1600, "courseId must be Integer"));
    return;
  }
  try {
    const results: Array<SelectCourseAttributes> = await SelectCourse.findAll({
      where: {
        studentId:
          typeof studentId == "undefined"
            ? {
                [Op.gt]: -1,
              }
            : (studentId as string),
        courseId:
          typeof courseId == "undefined"
            ? {
                [Op.gt]: -1,
              }
            : (courseId as string),
      },
    });
    // if(results.length){
    //   results.forEach(item=>{
    //     await item.getCourse()
    //   })
    // }
    res.send(setNormalTemplate(2000, results));
  } catch (e) {
    console.log(e);
    res.send(setErrorTemplate(1600, "失败"));
  }
}
