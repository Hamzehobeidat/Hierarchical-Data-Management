import express from 'express';
import {
  createDepartment,
  getDepartments,
  getDepartmentById,
  updateDepartment
} from './controller.js';
import porjectsRouter from './projects/index.js';
import permissionsValidator from '../../../middlewares/auth/permissionsValidator.js';
import isManagerOfDepartment from '../../../middlewares/validators/isManagerOfDepartment.js';

const router = express.Router({ mergeParams: true });

router.use('/:departmentId/project', porjectsRouter);

router.post('/', permissionsValidator('admin'), createDepartment);
router.get('/', permissionsValidator('admin'), getDepartments);
router.get(
  '/:id',
  permissionsValidator('admin', 'manager'),
  isManagerOfDepartment,
  getDepartmentById
);
router.patch(
  '/:id',
  permissionsValidator('admin', 'manager'),
  isManagerOfDepartment,
  updateDepartment
);

export default router;
