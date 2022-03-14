import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Optional } from "sequelize";
export default {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(128),
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
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
};
export class ProjectInstance extends Model<InferAttributes<ProjectInstance>, InferCreationAttributes<ProjectInstance>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare createdAt?: Date;
  declare updatedAt?: Date;
  declare isDeleted?: boolean;
  declare studentId: CreationOptional<number>;
}
