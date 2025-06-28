import { StatusCodes } from 'http-status-codes';
import { taskService } from '../../services/index.js';

const isTaskBelongsToProject = async (req, res, next) => {
  try {
    const { params } = req;
    const { projectId } = params;

    const task = await taskService.getTaskById(params);

    if (task?.projectId !== +projectId) {
      return res.status(StatusCodes.FORBIDDEN).json({
        message: 'Forbidden: You cannot access this task because it is not belong to this project!.'
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default isTaskBelongsToProject;
