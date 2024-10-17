import React, { useState } from 'react';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (project: { name: string; arr: number; users: number; launchDate: string }) => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [project, setProject] = useState({ name: '', arr: 0, users: 0, launchDate: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(project);
    setProject({ name: '', arr: 0, users: 0, launchDate: '' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-2xl font-bold mb-4">Add Project</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-1">
              Project Name
            </label>
            <input
              id="projectName"
              type="text"
              value={project.name}
              onChange={(e) => setProject({ ...project, name: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="projectARR" className="block text-sm font-medium text-gray-700 mb-1">
              ARR
            </label>
            <input
              id="projectARR"
              type="number"
              value={project.arr}
              onChange={(e) => setProject({ ...project, arr: Number(e.target.value) })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="projectUsers" className="block text-sm font-medium text-gray-700 mb-1">
              Number of Users
            </label>
            <input
              id="projectUsers"
              type="number"
              value={project.users}
              onChange={(e) => setProject({ ...project, users: Number(e.target.value) })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="projectLaunchDate" className="block text-sm font-medium text-gray-700 mb-1">
              Launch Date
            </label>
            <input
              id="projectLaunchDate"
              type="date"
              value={project.launchDate}
              onChange={(e) => setProject({ ...project, launchDate: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-2 px-4 py-2 bg-gray-200 rounded">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
              Add Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;