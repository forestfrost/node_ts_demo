import { Sequelize } from "sequelize";
import project, { ProjectInstance } from "./models/project";
import student, { StudentInstance } from "./models/student";
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
async function init() {
  try {
    await sequelize.authenticate();
    console.log("数据库连接成功");
    await sequelize.sync();
    // await sequelize.sync({ alter: true });
    console.log("数据表更新完成");
  } catch (e) {
    console.log(e);
  }
}
init();
export { sequelize, Student, Project };
