import { StatusCodes } from 'http-status-codes';
import { organizationService } from '../../services/index.js';

export const createOrganization = async (req, res, next) => {
  try {
    const { body } = req;
    const organization = await organizationService.createOrganization(body);
    return res.status(StatusCodes.CREATED).json(organization);
  } catch (error) {
    return next(error);
  }
};

export const getOrganizations = async (req, res, next) => {
  const { query } = req;
  try {
    const organizations = await organizationService.getOrganizations(query);
    return res.json(organizations);
  } catch (error) {
    return next(error);
  }
};

export const getOrganizationById = async (req, res, next) => {
  const { params } = req;
  try {
    const organizations = await organizationService.getOrganizationById(params);
    return res.json(organizations);
  } catch (error) {
    return next(error);
  }
};

export const updateOrganization = async (req, res, next) => {
  const { params, body } = req;
  try {
    const organizations = await organizationService.updateOrganization(params, body);
    return res.json(organizations);
  } catch (error) {
    return next(error);
  }
};

export const deleteOrganization = async (req, res, next) => {
  const { params, body } = req;
  try {
    const organizations = await organizationService.deleteOrganization(params, body);
    return res.json(organizations);
  } catch (error) {
    return next(error);
  }
};
