import { StatusCodes } from 'http-status-codes';
import { taskService } from '../../../../../services/index.js';

export const createTask = async (req, res, next) => {
  try {
    const { body, params } = req;
    const project = await taskService.createTask(params, body);
    return res.status(StatusCodes.CREATED).json(project);
  } catch (error) {
    return next(error);
  }
};

export const getTasks = async (req, res, next) => {
  const { params, query } = req;
  try {
    const projects = await taskService.getTasks(params, query);
    return res.json(projects);
  } catch (error) {
    return next(error);
  }
};

export const getTaskById = async (req, res, next) => {
  const { params } = req;
  try {
    const task = await taskService.getTaskById(params);
    return res.json(task);
  } catch (error) {
    return next(error);
  }
};

export const updateTask = async (req, res, next) => {
  const { params, body } = req;
  try {
    const project = await taskService.updateTask(params, body);
    return res.json(project);
  } catch (error) {
    return next(error);
  }
};
