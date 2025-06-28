import express from 'express';
import { createProjec, getProjects, getPojectById, updateProject } from './controller.js';
import taskRouter from './tasks/index.js';
import permissionsValidator from '../../../../middlewares/auth/permissionsValidator.js';
import isManagerOfDepartment from '../../../../middlewares/validators/isManagerOfDepartment.js';
const router = express.Router({ mergeParams: true });

router.use('/:projectId/task', taskRouter);

router.post('/', permissionsValidator('admin'), createProjec);
router.get('/', permissionsValidator('admin'), getProjects);
router.get('/:id', permissionsValidator('admin', 'manager'), isManagerOfDepartment, getPojectById);
router.patch(
  '/:id',
  permissionsValidator('admin', 'manager'),
  isManagerOfDepartment,
  updateProject
);

export default router;
