import { DataTypes } from 'sequelize';
import sequelize from '../connection.js';

const Role = sequelize.define(
  'role',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    name: { type: DataTypes.STRING, field: 'name', unique: true, allowNull: false }
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['name']
      }
    ]
  }
);

export default Role;
