import { DataTypes } from 'sequelize';
import sequelize from '../connection.js';

const Task = sequelize.define(
  'task',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    name: { type: DataTypes.STRING, field: 'name' },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'project_id'
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'employee_id'
    },
    status: {
      type: DataTypes.ENUM('todo', 'in_progress', 'done'),
      defaultValue: 'todo',
      field: 'status'
    }
  },
  {
    indexes: [
      {
        fields: ['project_id']
      },
      {
        fields: ['employee_id']
      }
    ]
  }
);

export default Task;
