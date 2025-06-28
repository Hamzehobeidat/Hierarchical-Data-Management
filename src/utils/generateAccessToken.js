import jwt from 'jsonwebtoken';
import config from '../config/index.js';

const { secret } = config.jwt;
const { accessTokenExpiresIn } = config;
const generateAccessToken = (user, expiresInDay = accessTokenExpiresIn || 24) => {
  const expiresInSeconds = Number(expiresInDay) * 60 * 60;

  const idToken = jwt.sign(
    {
      userId: user?.id,
      name: user?.name,
      email: user?.email,
      role: user?.role,
      departmentId: user?.departmentId
    },
    secret,
    { expiresIn: Math.floor(expiresInSeconds) }
  );
  return { idToken, expiresIn: Math.floor(expiresInSeconds) };
};

export default generateAccessToken;
