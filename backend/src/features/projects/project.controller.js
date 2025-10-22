import {
  getProjectsService,
  createProjectService,
  deleteProjectService,
} from './project.service.js';

// @desc    Get all projects for the logged-in user
// @route   GET /api/projects
export const getProjects = async (req, res, next) => {
  try {
    const projects = await getProjectsService(req.user.id);
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new project
// @route   POST /api/projects
export const createProject = async (req, res, next) => {
  try {
    const project = await createProjectService(req.body, req.user.id);
    res.status(201).json({ success: true, data: project, message: 'Project created successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
export const deleteProject = async (req, res, next) => {
  try {
    await deleteProjectService(req.params.id, req.user.id);
    res.status(200).json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    next(error);
  }
};