import React, { useState } from 'react';
import { useAuthUser } from '../features/auth/authApi.js';
import { useProjects, useDeleteProject } from '../features/projects/projectApi.js';
import { Card, CardContent, CardHeader } from '../components/ui/Card.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Modal } from '../components/ui/Modal.jsx';
import { CreateProjectForm } from '../components/CreateProjectForm.jsx';
import { FolderIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

const DashboardPage = () => {
  const { data: user, isLoading: isUserLoading, isError: isUserError } = useAuthUser();
  const { data: projects, isLoading: isProjectsLoading, isError: isProjectsError } = useProjects();
  const deleteProjectMutation = useDeleteProject();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isUserLoading || isProjectsLoading) return <div>Loading...</div>;
  if (isUserError || isProjectsError || !user) return <div>Error loading data.</div>;

  // Calculate stats dynamically
  const totalProjects = projects?.length || 0;
  const inProgressProjects = projects?.filter(p => p.status === 'In Progress').length || 0;
  const completedProjects = projects?.filter(p => p.status === 'Completed').length || 0;

  const stats = [
    { name: 'Total Projects', value: totalProjects },
    { name: 'In Progress', value: inProgressProjects },
    { name: 'Completed', value: completedProjects },
  ];

  const handleDeleteProject = (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteProjectMutation.mutate(projectId);
    }
  };

  return (
    <>
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Welcome back, {user.name}</h1>
        <p className="mt-1 text-sm text-gray-600">Here's what's happening with your projects today.</p>
      </div>

      {/* Dynamic Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-3 mb-8">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-gray-600">{stat.name}</p>
              <p className="mt-2 text-3xl font-semibold text-gray-900">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dynamic Recent Projects */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Your Projects</h3>
            <Button variant="secondary" size="sm" onClick={() => setIsModalOpen(true)}>
              <PlusIcon className="h-4 w-4 mr-1" />
              New Project
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {projects && projects.length > 0 ? (
            <ul className="-my-5 divide-y divide-gray-200">
              {projects.map((project) => (
                <li key={project._id} className="py-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <FolderIcon className="h-8 w-8 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{project.name}</p>
                      <p className="text-sm text-gray-500">Due {new Date(project.dueDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      project.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                      project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {project.status}
                    </span>
                    <Button variant="link" onClick={() => handleDeleteProject(project._id)} className="text-red-600 hover:text-red-800 p-1">
                      <TrashIcon className="h-5 w-5" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center py-8">No projects yet. Create your first one!</p>
          )}
        </CardContent>
      </Card>

      {/* Modal for creating a project */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Project">
        <CreateProjectForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
};

export default DashboardPage;