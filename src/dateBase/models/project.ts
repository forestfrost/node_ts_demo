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
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
};
export interface ProjectAttributes {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface ProjectCreationAttributes extends Optional<ProjectAttributes, "id"> {}
export interface ProjectInstance extends Model<ProjectAttributes, ProjectCreationAttributes>, ProjectAttributes {}
