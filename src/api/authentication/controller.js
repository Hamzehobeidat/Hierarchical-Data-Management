import { StatusCodes } from 'http-status-codes';
import { authService } from '../../services/index.js';

export const signIn = async (req, res, next) => {
  try {
    const accessToken = await authService.signIn(req.body);
    return accessToken
      ? res.status(StatusCodes.OK).json(accessToken)
      : res.status(StatusCodes.UNAUTHORIZED).send({ message: 'Invalid email or password' });
  } catch (error) {
    return next(error);
  }
};

export const signUp = async (req, res, next) => {
  try {
    const { body } = req;
    const user = await authService.signUp(body);
    return res.status(StatusCodes.CREATED).json(user);
  } catch (error) {
    return next(error);
  }
};
