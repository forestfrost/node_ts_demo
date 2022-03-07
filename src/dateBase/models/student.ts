import { DataTypes, Model, Optional } from "sequelize";
export default {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  studentName: {
    type: DataTypes.STRING,
  },
  age: {
    type: DataTypes.INTEGER,
  },
  sex: {
    type: DataTypes.INTEGER,
  },
  address: {
    type: DataTypes.STRING,
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
export interface StudentAttributes {
  id: number;
  studentName: string;
  age: number;
  sex: number;
  address: string;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
}
export interface StudentCreationAttributes extends Optional<StudentAttributes, "id"> {}
export interface StudentInstance extends Model<StudentAttributes, StudentCreationAttributes>, StudentAttributes {}
