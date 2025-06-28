import models from '../data-access/index.js';

const { Organization, Department, Project, Task } = models;

const createOrganization = async body => {
  const { name } = body;
  const organization = await Organization.create({ name });
  return organization;
};

const getOrganizations = async query => {
  const pageNumber = parseInt(query?.page) || 0;
  const pageSize = parseInt(query?.size) || 10;
  const organizations = await Organization.findAll({
    attributes: {
      exclude: ['updatedAt', 'createdAt']
    },
    include: [
      {
        model: Department,
        attributes: {
          exclude: ['manager_id', 'organization_id', 'updatedAt', 'createdAt']
        },
        include: [
          {
            model: Project,
            attributes: {
              exclude: ['department_id', 'updatedAt', 'createdAt']
            },
            include: [
              {
                model: Task,
                attributes: {
                  exclude: ['project_id', 'employee_id', 'updatedAt', 'createdAt']
                }
              }
            ]
          }
        ]
      }
    ],
    offset: pageNumber * pageSize,
    limit: pageSize
  });
  return organizations;
};

const getOrganizationById = async params => {
  const { id } = params;
  const organizations = await Organization.findByPk(id, {
    attributes: {
      exclude: ['updatedAt', 'createdAt']
    },
    include: [
      {
        model: Department,
        attributes: {
          exclude: ['manager_id', 'organization_id', 'updatedAt', 'createdAt']
        },
        include: [
          {
            model: Project,
            attributes: {
              exclude: ['department_id', 'updatedAt', 'createdAt']
            },
            include: [
              {
                model: Task,
                attributes: {
                  exclude: ['project_id', 'employee_id', 'updatedAt', 'createdAt']
                }
              }
            ]
          }
        ]
      }
    ]
  });
  return organizations;
};

const updateOrganization = async (params, body) => {
  const { id } = params;
  const { name } = body;
  const organization = await Organization.update({ name }, { where: { id }, returning: true });
  const data = organization[1][0] || (await Organization.findByPk(id));
  return data;
};

const deleteOrganization = async params => {
  const { id } = params;

  const organization = await Organization.destroy({
    where: { id }
  });

  return organization;
};

export default {
  createOrganization,
  getOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization
};
