import { StatusCodes } from 'http-status-codes';
import { taskService } from '../../services/index.js';

const isTaskAssignedToUser = async (req, res, next) => {
  try {
    const { params } = req;
    const userId = req.user?.id;
    const userRole = req.user?.role;
    if (userRole === 'admin' || userRole === 'manager') {
      return next();
    }

    const task = await taskService.getTaskById(params);
    if (userRole === 'employee' && task?.employeeId !== +userId) {
      return res.status(StatusCodes.FORBIDDEN).json({
        message: 'Forbidden: You cannot access this task because it is not assigned to you!.'
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default isTaskAssignedToUser;
