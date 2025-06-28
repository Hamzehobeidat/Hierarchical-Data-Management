import { StatusCodes } from 'http-status-codes';

const permissionsValidator =
  (...requiredPermissions) =>
  async (req, res, next) => {
    try {
      const userRole = req.user?.role;
      if (!requiredPermissions.includes(userRole)) {
        return res
          .status(StatusCodes.FORBIDDEN)
          .json({ message: 'Forbidden: insufficient permissions' });
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default permissionsValidator;
