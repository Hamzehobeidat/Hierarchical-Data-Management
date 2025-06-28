import models from '../data-access/index.js';
import notification from './notification.js';

const { Task, User } = models;

const createTask = async (params, body) => {
  const { name, employeeId } = body;
  const { projectId } = params;
  const task = await Task.create({ name, projectId, employeeId });
  return task;
};

const getTasks = async (params, query) => {
  const { projectId } = params;
  const pageNumber = parseInt(query?.page) || 0;
  const pageSize = parseInt(query?.size) || 10;
  const tasks = await Task.findAll({
    where: { projectId },
    attributes: {
      exclude: ['employee_id', 'project_id', 'updatedAt', 'createdAt']
    },
    include: [
      {
        model: User,
        attributes: { exclude: ['role_id', 'department_id', 'password', 'updatedAt', 'createdAt'] }
      }
    ],
    offset: pageNumber * pageSize,
    limit: pageSize
  });
  return tasks;
};

const getTaskById = async params => {
  const { projectId, id } = params;
  const task = await Task.findOne({
    where: { id, projectId },
    attributes: {
      exclude: ['employee_id', 'project_id', 'updatedAt', 'createdAt']
    },
    include: [
      {
        model: User,
        attributes: { exclude: ['role_id', 'department_id', 'password', 'updatedAt', 'createdAt'] }
      }
    ]
  });
  return task;
};

const updateTask = async (params, body) => {
  const { id } = params;
  const { name, employeeId, status } = body;
  await Task.update({ name, employeeId, status }, { where: { id }, returning: true });
  const task = await Task.findByPk(id);
  console.log(task.projectId);
  notification.trackTaskUpdate(task?.projectId);
  return task;
};

export default {
  createTask,
  getTasks,
  getTaskById,
  updateTask
};
