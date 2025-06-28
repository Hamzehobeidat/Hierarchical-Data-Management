import { DataTypes } from 'sequelize';
import sequelize from '../connection.js';

const Notification = sequelize.define('notification', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'message'
  },
  projectId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'project_id'
  },
  type: {
    type: DataTypes.STRING,
    defaultValue: 'task_update',
    field: 'type'
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_read'
  }
});

export default Notification;
