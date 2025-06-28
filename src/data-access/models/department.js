import { DataTypes } from 'sequelize';
import sequelize from '../connection.js';

const Department = sequelize.define(
  'department',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    name: { type: DataTypes.STRING, field: 'name' },
    organizationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'organization_id'
    },
    managerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'manager_id'
    }
  },
  {
    indexes: [
      {
        fields: ['organization_id']
      },
      {
        fields: ['manager_id']
      }
    ]
  }
);

export default Department;
