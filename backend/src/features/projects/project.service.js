import Project from '../../models/project.js';

// Get all projects for a specific user
export const getProjectsService = async (ownerId) => {
  return await Project.find({ owner: ownerId }).sort({ createdAt: -1 });
};

// Create a new project for a specific user
export const createProjectService = async (projectData, ownerId) => {
  return await Project.create({ ...projectData, owner: ownerId });
};

// Delete a project (only if it belongs to the user)
export const deleteProjectService = async (projectId, ownerId) => {
  const project = await Project.findOne({ _id: projectId, owner: ownerId });
  if (!project) {
    throw new Error('Project not found or you are not authorized');
  }
  await project.deleteOne();
};