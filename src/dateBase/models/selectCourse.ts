import { DataTypes, Model, Optional } from "sequelize";
import { Student, Course } from "../index";
export default {
  id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, primaryKey: true, autoIncrement: true },
  studentId: {
    type: DataTypes.INTEGER,
    references: {
      model: Student,
      key: "id",
    },
  },
  courseId: {
    type: DataTypes.INTEGER,
    references: {
      model: Course,
      key: "id",
    },
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
};
export interface SelectCourseAttributes {
  id: number;
  studentId: number;
  courseId: number;
  createdAt: Date;
  updatedAt: Date;
  isDeleted?: boolean;
}
export interface SelectCourseCreationAttributes extends Optional<SelectCourseAttributes, "id"> {}
export interface SelectCourseInstance
  extends Model<SelectCourseAttributes, SelectCourseCreationAttributes>,
    SelectCourseAttributes {}
