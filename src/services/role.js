import models from '../data-access/index.js';

const { Role } = models;

const getRoleById = async params => {
  const { id } = params;
  const role = await Role.findByPk(id);
  return role;
};

export default {
  getRoleById
};
