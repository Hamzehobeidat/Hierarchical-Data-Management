import { StatusCodes } from 'http-status-codes';
import { departmentService } from '../../services/index.js';

const isManagerOfDepartment = async (req, res, next) => {
  try {
    const { params } = req;
    const userId = req.user?.id;
    const userRole = req.user?.role;
    if (userRole === 'admin' || userRole === 'employee') {
      return next();
    }

    const department = await departmentService.getDepartmentById(params);
    if (userRole === 'manager' && department?.managerId !== +userId) {
      return res.status(StatusCodes.FORBIDDEN).json({
        message: 'Forbidden: You cannot access this department because it is not intended for you.'
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default isManagerOfDepartment;
