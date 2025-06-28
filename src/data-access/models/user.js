import { DataTypes } from 'sequelize';
import sequelize from '../connection.js';

const User = sequelize.define(
  'user',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'name'
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'email'
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'password'
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'department_id'
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'role_id'
    }
  },
  {
    indexes: [
      {
        name: 'idx_email',
        fields: ['email']
      },
      {
        fields: ['role_id']
      },
      {
        fields: ['department_id']
      }
    ]
  }
);

export default User;
