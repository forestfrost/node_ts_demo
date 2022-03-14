import { Student } from "@/dateBase/index";
import { Project } from "@/dateBase/index";
import { Request, Response } from "express";
import { Op } from "sequelize";
import { setErrorTemplate, setNormalTemplate, notUndefined } from "@/utils/common";
/**
 * @description 获取学生列表
 */
export async function getStudentList(req: Request, res: Response) {
  try {
    const { query } = req;
    const { id, name, sex, age } = query;
    if (typeof id !== "undefined" && !/\d+/.test(id as string)) {
      res.send(setErrorTemplate(1800, "id must be Integer"));
      return;
    }
    if (typeof age !== "undefined" && !/\d+/.test(age as string)) {
      res.send(setErrorTemplate(1800, "age must be Integer"));
      return;
    }
    if (typeof sex !== "undefined" && ![0, 1].includes(Number(sex))) {
      res.send(setErrorTemplate(1800, "sex must be 1 or 0"));
      return;
    }
    let results = await Student.findAll({
      attributes: ["studentName", "age"],
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
      include: [
        {
          model: Project,
          attributes: ["name"],
        },
      ],
    });
    res.send(setNormalTemplate(2000, results));
  } catch (e) {
    console.log(e);
    res.send(setErrorTemplate(1800, "失败"));
  }
}
/**
 * @description 新增学生
 */
export async function addStudent(req: Request, res: Response) {
  const { name, sex, address, age } = req.body;
  const queryNotUndefined = notUndefined({ name, sex, age, address });
  if (typeof queryNotUndefined !== "boolean") {
    res.send(setErrorTemplate(1800, queryNotUndefined));
    return;
  }
  if (!/\d+/.test(age)) {
    res.send(setErrorTemplate(1800, "age must be Integer"));
    return;
  }
  if (![0, 1].includes(Number(sex))) {
    res.send(setErrorTemplate(1800, "sex must be 1 or 0"));
    return;
  }
  const now = new Date();
  //node环境下 Date时间为国际时间,所以需要手动加 8 个小时 => 北京时间
  now.setHours(now.getHours() + 8);
  try {
    await Student.create(
      {
        studentName: name,
        age,
        sex,
        address,
        createdAt: now,
        updatedAt: now,
      }
      // { fields: ["studentName", "age", "sex"] }
    );
    res.send(setNormalTemplate(2000, []));
  } catch (e) {
    res.send(setErrorTemplate(1800, "失败"));
  }
}
