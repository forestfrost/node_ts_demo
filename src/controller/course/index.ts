import { Course, Student } from "@/dateBase";
import { CourseAttributes } from "@/dateBase/models/course";
import { Request, Response } from "express";
import { Op } from "sequelize";
import { setErrorTemplate, setNormalTemplate, notUndefined } from "@/utils/common";

/**
 * @description 增加课程
 */
export async function addCourse(req: Request, res: Response) {
  const { name, duration } = req.body;
  const queryNotUndefined = notUndefined({ name, duration });
  if (typeof queryNotUndefined !== "boolean") {
    res.send(setErrorTemplate(1700, queryNotUndefined));
    return;
  }
  if (!/\d+/.test(duration)) {
    res.send(setErrorTemplate(1700, "duration must be Integer"));
    return;
  }
  const now = new Date();
  now.setHours(now.getHours() + 8);
  try {
    await Course.create({
      name,
      duration,
      createdAt: now,
      updatedAt: now,
    });
    res.send(setNormalTemplate(2000, []));
  } catch (e) {
    res.send(setErrorTemplate(1700, "失败"));
  }
}
/**
 * @description 获取课程列表与其选课人
 */
export async function getCourseList(req: Request, res: Response) {
  try {
    const results: Array<CourseAttributes> = await Course.findAll({
      attributes:{
        exclude:["id","isDeleted"]
      },
      include: [
        {
          model: Student,
          where: {
            isDeleted: {
              [Op.eq]: false,
            },
            sex: {
              [Op.eq]: 1,
            },
          },
          attributes: ["studentName", "age", "sex", "address"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    res.send(setNormalTemplate(2000, results));
  } catch (e) {
    console.log(e);
    res.send(setErrorTemplate(1700, "失败"));
  }
}
