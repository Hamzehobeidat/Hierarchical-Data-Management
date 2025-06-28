import models from '../data-access/index.js';

const { Project, Task } = models;

const createProjec = async (params, body) => {
  const { name } = body;
  const { departmentId } = params;
  const project = await Project.create({ name, departmentId });
  return project;
};

const getProjects = async (params, query) => {
  const { departmentId } = params;
  const pageNumber = parseInt(query?.page) || 0;
  const pageSize = parseInt(query?.size) || 10;
  const projects = await Project.findAll({
    where: { departmentId },
    attributes: {
      exclude: ['updatedAt', 'createdAt']
    },
    include: [
      {
        model: Task,
        attributes: { exclude: ['employee_id', 'project_id', 'updatedAt', 'createdAt'] }
      }
    ],
    offset: pageNumber * pageSize,
    limit: pageSize
  });
  return projects;
};

const getPojectById = async params => {
  const { departmentId, id } = params;
  const project = await Project.findOne({
    where: { id, departmentId },
    attributes: {
      exclude: ['updatedAt', 'createdAt']
    }
  });
  return project;
};

const updateProject = async (params, body) => {
  const { id } = params;
  const { name } = body;
  const project = await Project.update({ name }, { where: { id }, returning: true });
  const data = project[1][0] || (await Project.findByPk(id));
  return data;
};

export default {
  createProjec,
  getProjects,
  getPojectById,
  updateProject
};
