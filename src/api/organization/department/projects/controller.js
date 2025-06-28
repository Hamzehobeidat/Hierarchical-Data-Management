import { StatusCodes } from 'http-status-codes';
import { projectService } from '../../../../services/index.js';

export const createProjec = async (req, res, next) => {
  try {
    const { body, params } = req;
    const project = await projectService.createProjec(params, body);
    return res.status(StatusCodes.CREATED).json(project);
  } catch (error) {
    return next(error);
  }
};

export const getProjects = async (req, res, next) => {
  const { params, query } = req;
  try {
    const projects = await projectService.getProjects(params, query);
    return res.json(projects);
  } catch (error) {
    return next(error);
  }
};

export const getPojectById = async (req, res, next) => {
  const { params } = req;
  try {
    const project = await projectService.getPojectById(params);
    return project
      ? res.json(project)
      : res.status(StatusCodes.NOT_FOUND).json({ message: 'Project not found!' });
  } catch (error) {
    return next(error);
  }
};

export const updateProject = async (req, res, next) => {
  const { params, body } = req;
  try {
    const project = await projectService.updateProject(params, body);
    return res.json(project);
  } catch (error) {
    return next(error);
  }
};
