import models from '../data-access/index.js';

const { User } = models;

const getUserByEmail = async email => {
  const user = await User.findOne({ where: { email } });
  return user;
};

export default {
  getUserByEmail
};
