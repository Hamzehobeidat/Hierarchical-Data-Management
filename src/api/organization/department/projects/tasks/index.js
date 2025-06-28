import express from 'express';
import { createTask, getTasks, getTaskById, updateTask } from './controller.js';
import permissionsValidator from '../../../../../middlewares/auth/permissionsValidator.js';
import isTaskAssignedToUser from '../../../../../middlewares/validators/isTaskAssignedToUser.js';
import isTaskBelongsToProject from '../../../../../middlewares/validators/isTaskBelongsToProject.js';

const router = express.Router({ mergeParams: true });

router.post('/', permissionsValidator('admin'), createTask);
router.get('/', permissionsValidator('admin'), getTasks);
router.get(
  '/:id',
  permissionsValidator('admin', 'manager', 'employee'),
  isTaskBelongsToProject,
  isTaskAssignedToUser,
  getTaskById
);
router.patch(
  '/:id',
  permissionsValidator('admin', 'manager', 'employee'),
  isTaskBelongsToProject,
  isTaskAssignedToUser,
  updateTask
);

export default router;
