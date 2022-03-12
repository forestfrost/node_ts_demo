import exp from "constants";
import { Mode } from "fs";
import { DataTypes, Model, Optional } from "sequelize";
export default {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(128),
    defaultValue: "",
  },
  duration: {
    type: DataTypes.INTEGER,
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
export interface CourseAttributes {
  id: number;
  name: string;
  duration: number;
  createdAt: Date;
  updatedAt: Date;
  isDeleted?: boolean;
}
export interface CourseCreateionAttributes extends Optional<CourseAttributes, "id"> {}
export interface CourseInstance extends Model<CourseAttributes, CourseCreateionAttributes>, CourseAttributes {}
