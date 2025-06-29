import models from '../data-access/index.js';

const { Department, Project, User } = models;

const createDepartment = async (params, body) => {
  const { name, managerId } = body;
  const { organizationId } = params;
  const department = await Department.create({ name, managerId, organizationId });
  return department;
};

const getDepartments = async (params, query) => {
  const { organizationId } = params;
  const pageNumber = parseInt(query?.page) || 0;
  const pageSize = parseInt(query?.size) || 10;
  const departments = await Department.findAll({
    where: { organizationId },
    attributes: {
      exclude: ['manager_id', 'organization_id', 'updatedAt', 'createdAt']
    },
    include: [
      {
        model: User,
        as: 'manager',
        attributes: {
          exclude: ['role_id', 'department_id', 'password', 'updatedAt', 'createdAt']
        }
      },
      {
        model: Project,
        attributes: {
          exclude: ['department_id', 'updatedAt', 'createdAt']
        }
      }
    ],
    offset: pageNumber * pageSize,
    limit: pageSize
  });
  return departments;
};

const getDepartmentById = async params => {
  const { organizationId, id, departmentId } = params;
  const department = await Department.findOne({
    where: { id: departmentId ? departmentId : id, organizationId },
    attributes: {
      exclude: ['manager_id', 'organization_id', 'updatedAt', 'createdAt']
    },
    include: [
      {
        model: User,
        as: 'manager',
        attributes: {
          exclude: ['role_id', 'department_id', 'password', 'updatedAt', 'createdAt']
        }
      },
      {
        model: Project,
        attributes: {
          exclude: ['department_id', 'updatedAt', 'createdAt']
        }
      }
    ]
  });
  return department;
};

const updateDepartment = async (params, body) => {
  const { id } = params;
  const department = await Department.update({ ...body }, { where: { id }, returning: true });
  const data = department[1][0] || (await Department.findByPk(id));
  return data;
};

export default {
  createDepartment,
  getDepartments,
  getDepartmentById,
  updateDepartment
};
