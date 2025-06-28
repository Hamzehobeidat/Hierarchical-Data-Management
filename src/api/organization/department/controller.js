import { StatusCodes } from 'http-status-codes';
import { departmentService } from '../../../services/index.js';

export const createDepartment = async (req, res, next) => {
  try {
    const { body, params } = req;
    const department = await departmentService.createDepartment(params, body);
    return res.status(StatusCodes.CREATED).json(department);
  } catch (error) {
    return next(error);
  }
};

export const getDepartments = async (req, res, next) => {
  const { params, query } = req;
  try {
    const departments = await departmentService.getDepartments(params, query);
    return res.json(departments);
  } catch (error) {
    return next(error);
  }
};

export const getDepartmentById = async (req, res, next) => {
  const { params } = req;
  try {
    const department = await departmentService.getDepartmentById(params);
    return department
      ? res.json(department)
      : res.status(StatusCodes.NOT_FOUND).json({ message: 'Department not found!' });
  } catch (error) {
    return next(error);
  }
};

export const updateDepartment = async (req, res, next) => {
  const { params, body } = req;
  try {
    const department = await departmentService.updateDepartment(params, body);
    return res.json(department);
  } catch (error) {
    return next(error);
  }
};
