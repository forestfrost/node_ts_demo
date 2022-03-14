import { Sequelize } from "sequelize";
import project, { ProjectInstance } from "./models/project";
import student, { StudentInstance } from "./models/student";
import course, { CourseInstance } from "./models/course";
import selectCourse, { SelectCourseInstance } from "./models/selectCourse";
const sequelize = new Sequelize("mydb", "root", "123456", {
  host: "localhost",
  port: 3307,
  dialect: "mysql",
  define: {
    freezeTableName: true,
    timestamps: false,
  },
});
const Student = sequelize.define<StudentInstance>("student", student);
const Project = sequelize.define<ProjectInstance>("project", project);
const Course = sequelize.define<CourseInstance>("course", course);
const SelectCourse = sequelize.define<SelectCourseInstance>("selectCourse", selectCourse);
//学生 Student 与 课程 Course 多对多关联
Student.belongsToMany(Course, { through: SelectCourse });
Course.belongsToMany(Student, { through: SelectCourse });
//学生 Student 与 项目 Project 一对多关联
Student.hasMany(Project, {
  foreignKey: {
    allowNull: false,
  },
});
Project.belongsTo(Student);
async function init() {
  try {
    await sequelize.authenticate();
    console.log("数据库连接成功");
    await sequelize.sync();
    //await sequelize.sync({ alter: true });
    console.log("数据表更新完成");
  } catch (e) {
    console.log(e);
  }
}
init();
export { sequelize, Student, Project, Course, SelectCourse };
