import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import config from '../../config/index.js';

const bearerAuth = async (req, res, next) => {
  const token = req.headers && req.headers.authorization;
  if (!token)
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'Unauthenticated'
    });

  const bearerToken = token.replace('Bearer ', '');
  jwt.verify(bearerToken, config.jwt.secret, (err, decoded) => {
    if (err) {
      res.status(StatusCodes.UNAUTHORIZED).send({
        message: 'Unauthenticated user'
      });
    }
    req.user = { id: decoded.userId, role: decoded.role, departmentId: decoded.departmentId };
    next();
  });
};

export default bearerAuth;
