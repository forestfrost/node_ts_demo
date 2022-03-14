import {
  Association,
  CreationOptional,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManySetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "sequelize";
import { ProjectInstance } from "./project";
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
export class StudentInstance extends Model<
  InferAttributes<StudentInstance, { omit: "projects" }>,
  InferCreationAttributes<StudentInstance, { omit: "projects" }>
> {
  declare id: CreationOptional<number>;
  declare studentName: string;
  declare age: number;
  declare sex: number;
  declare address: string;
  declare createdAt?: Date;
  declare updatedAt?: Date;
  declare isDeleted?: boolean;

  declare getProjects: HasManyGetAssociationsMixin<ProjectInstance>; // Note the null assertions!
  declare addProject: HasManyAddAssociationMixin<ProjectInstance, number>;
  declare addProjects: HasManyAddAssociationsMixin<ProjectInstance, number>;
  declare setProjects: HasManySetAssociationsMixin<ProjectInstance, number>;
  declare removeProject: HasManyRemoveAssociationMixin<ProjectInstance, number>;
  declare removeProjects: HasManyRemoveAssociationsMixin<ProjectInstance, number>;
  declare hasProject: HasManyHasAssociationMixin<ProjectInstance, number>;
  declare hasProjects: HasManyHasAssociationsMixin<ProjectInstance, number>;
  declare countProjects: HasManyCountAssociationsMixin;
  declare createProject: HasManyCreateAssociationMixin<ProjectInstance, "studentId">;

  declare projects: NonAttribute<Array<ProjectInstance>>;

  declare static associations: {
    projects: Association<StudentInstance, ProjectInstance>;
  };
}
