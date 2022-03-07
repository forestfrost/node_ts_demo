import { Student } from "@/dateBase/index";
import { StudentAttributes } from "@/dateBase/models/student";
import { Request, Response } from "express";
import { Op } from "sequelize";
//错误新模板
function getErrorInfo(message: string) {
  return {
    code: 1800,
    message,
    data: [],
  };
}
/**
 * @description 获取学生列表
 */
export async function getStudentList(req: Request, res: Response) {
  try {
    const { query } = req;
    const { id, name, sex, age } = query;
    if (typeof id !== "undefined" && !/\d+/.test(id as string)) {
      res.send(getErrorInfo("id must be Integer"));
      return;
    }
    if (typeof age !== "undefined" && !/\d+/.test(age as string)) {
      res.send(getErrorInfo("age must be Integer"));
      return;
    }
    if (typeof sex !== "undefined" && ![0, 1].includes(Number(sex))) {
      res.send(getErrorInfo("sex must be 1 or 0"));
      return;
    }
    const results: Array<StudentAttributes> = await Student.findAll({
      where: {
        id:
          typeof id == "undefined"
            ? {
                [Op.gt]: -1,
              }
            : (id as string),
        studentName: {
          [Op.substring]: name ? (name as string) : "",
        },
        sex:
          typeof sex == "undefined"
            ? {
                [Op.or]: [0, 1],
              }
            : (sex as string),
        age:
          typeof age == "undefined"
            ? {
                [Op.gt]: -1,
              }
            : (age as string),
        isDeleted: false,
      },
    });
    res.send({ code: 2000, message: "成功", data: results });
  } catch (e) {
    console.log(e);
    res.send(getErrorInfo("失败"));
  }
}
/**
 * @description 新增学生
 */
export async function addStudent(req: Request, res: Response) {
  const { name, sex, address, age } = req.body;
  if (typeof age !== "undefined" && !/\d+/.test(age)) {
    res.send(getErrorInfo("age must be Integer"));
    return;
  }
  if (typeof sex !== "undefined" && ![0, 1].includes(Number(sex))) {
    res.send(getErrorInfo("sex must be 1 or 0"));
    return;
  }
  const now = new Date();
  now.setHours(now.getHours() + 8);
  try {
    await Student.create({
      studentName: name,
      age,
      sex,
      address,
      createdAt: now,
      updatedAt: now,
    });
    res.send({ code: 2000, message: "成功", data: [] });
  } catch (e) {
    res.send(getErrorInfo("失败"));
  }
}
