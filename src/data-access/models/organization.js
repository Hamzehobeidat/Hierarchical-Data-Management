import { DataTypes } from 'sequelize';
import sequelize from '../connection.js';

const Organization = sequelize.define('organization', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: { type: DataTypes.STRING, field: 'name' }
});

export default Organization;
