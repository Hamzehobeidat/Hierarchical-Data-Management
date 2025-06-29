import { StatusCodes } from 'http-status-codes';
import userService from '../../services/user.js';

const emailExistsValidator = async (req, res, next) => {
  const {
    body: { email }
  } = req;
  const user = await userService.getUserByEmail(email);

  return !user
    ? res.status(StatusCodes.UNAUTHORIZED).send({ message: 'User not found, please sign up first' })
    : next();
};

export default emailExistsValidator;
