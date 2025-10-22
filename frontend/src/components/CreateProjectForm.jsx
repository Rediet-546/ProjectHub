import React, { useState } from 'react';
import { useCreateProject } from '../features/projects/projectApi.js';
import { Input } from './ui/Input.jsx';
import { Button } from './ui/Button.jsx';

export const CreateProjectForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'Planning',
    dueDate: '',
  });

  const createProjectMutation = useCreateProject();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProjectMutation.mutate(formData, {
      onSuccess: () => {
        onClose(); // Close modal on success
        setFormData({ name: '', description: '', status: 'Planning', dueDate: '' });
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Project Name" name="name" value={formData.name} onChange={handleChange} required />
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          rows="3"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        >
          <option value="Planning">Planning</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <Input label="Due Date" name="dueDate" type="date" value={formData.dueDate} onChange={handleChange} required />
      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={createProjectMutation.isPending}>
          {createProjectMutation.isPending ? 'Creating...' : 'Create Project'}
        </Button>
      </div>
    </form>
  );
};