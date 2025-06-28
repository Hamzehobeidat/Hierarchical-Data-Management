import express from 'express';
import {
  createOrganization,
  getOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization
} from './controller.js';

import bearerAuth from '../../middlewares/auth/bearerAuth.js';
import permissionsValidator from '../../middlewares/auth/permissionsValidator.js';
import departmentRouter from './department/index.js';

const router = express.Router();

router.use(bearerAuth);

router.use('/:organizationId/department', departmentRouter);

router.use(permissionsValidator('admin'));

router.post('/', createOrganization);
router.get('/', getOrganizations);
router.get('/:id', getOrganizationById);
router.patch('/:id', updateOrganization);
router.delete('/:id', deleteOrganization);

export default router;
