import { Sequelize } from 'sequelize';
import config from '../config/index.js';

const {
  db: { options }
} = config;

const sequelize = new Sequelize(options);

export default sequelize;
