import bcrypt from 'bcrypt';
import models from '../data-access/index.js';
import roleService from './role.js';
import config from '../config/index.js';
import generateAccessToken from '../utils/generateAccessToken.js';

const { User } = models;
const { saltRounds } = config;

const signIn = async ({ email, password }) => {
  let idToken;
  const user = await User.findOne({
    where: { email },
    attributes: ['id', 'name', 'email', 'roleId', 'password', 'departmentId']
  });
  const role = await roleService.getRoleById({ id: user?.roleId });
  if (await bcrypt.compare(password, user?.password)) {
    idToken = generateAccessToken({
      id: user?.id,
      name: user.name,
      email: user?.email,
      role: role?.name,
      departmentId: user?.departmentId
    });
  }

  return idToken;
};

const signUp = async ({ name, password, email, roleId, departmentId }) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const user = await User.create({
    name,
    email,
    roleId,
    departmentId: departmentId ? departmentId : null,
    password: hashedPassword
  });
  const role = await roleService.getRoleById({ id: user?.roleId });

  let idToken = generateAccessToken({
    id: user?.id,
    name: user.name,
    email: user?.email,
    role: role?.name,
    departmentId: user?.departmentId
  });

  return idToken;
};

export default {
  signIn,
  signUp
};
