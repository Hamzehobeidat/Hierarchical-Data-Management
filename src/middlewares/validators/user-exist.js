import { StatusCodes } from 'http-status-codes';
import userService from '../../services/user.js';

const userExistsValidator = async (req, res, next) => {
  try {
    const {
      body: { email }
    } = req;
    const user = await userService.getUserByEmail(email?.toLowerCase());
    return user
      ? res.status(StatusCodes.CONFLICT).send({ message: 'User already exist!' })
      : next();
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
};

export default userExistsValidator;
