import { Router } from 'express';
import {
  getProjects,
  createProject,
  deleteProject,
} from './project.controller.js';
import { protect } from '../auth/auth.middleware.js';

const router = Router();

// All routes in this file are protected
router.use(protect);

router.route('/').get(getProjects).post(createProject);
router.route('/:id').delete(deleteProject);

export default router;