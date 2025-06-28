import { DataTypes } from 'sequelize';
import sequelize from '../connection.js';

const Project = sequelize.define(
  'project',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    name: { type: DataTypes.STRING, field: 'name' },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'department_id'
    }
  },
  {
    indexes: [
      {
        fields: ['department_id']
      }
    ]
  }
);

export default Project;
