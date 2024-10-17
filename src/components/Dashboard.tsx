import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, User } from 'lucide-react';
import ProjectModal from './ProjectModal';

interface Project {
  id: number;
  name: string;
  arr: number;
  users: number;
  launchDate: string;
}

const Dashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: '', followers: '', avatar: '' });
  const navigate = useNavigate();

  const handleAddProject = (project: Project) => {
    setProjects([...projects, { ...project, id: Date.now() }]);
    setIsModalOpen(false);
  };

  const handleGenerateWrapped = () => {
    navigate('/indie-wrapped', { state: { projects, userInfo } });
  };

  const handleSave = () => {
    // Implement save functionality here
    console.log('Saving user info:', userInfo);
    console.log('Saving projects:', projects);
    // You might want to send this data to a backend or store it in local storage
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">User Info</h2>
        <div className="flex flex-col items-center space-y-4">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
            {userInfo.avatar ? (
              <img src={userInfo.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
            ) : (
              <User size={48} className="text-gray-400" />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setUserInfo({ ...userInfo, avatar: reader.result as string });
                };
                reader.readAsDataURL(file);
              }
            }}
            className="hidden"
            id="avatar-upload"
          />
          <label htmlFor="avatar-upload" className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
            Upload Avatar
          </label>
          <input
            type="text"
            placeholder="Your Name"
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            placeholder="X Followers"
            value={userInfo.followers}
            onChange={(e) => setUserInfo({ ...userInfo, followers: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
            <p>ARR: ${project.arr.toLocaleString()}</p>
            <p>Users: {project.users.toLocaleString()}</p>
            <p>Launch Date: {new Date(project.launchDate).toLocaleDateString()}</p>
          </div>
        ))}
        <div
          className="bg-gray-100 rounded-lg shadow-md p-4 flex items-center justify-center cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={48} className="text-gray-400" />
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={handleSave}
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
        >
          Save
        </button>
        {projects.length > 0 && (
          <button
            onClick={handleGenerateWrapped}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Generate Indie Wrapped
          </button>
        )}
      </div>

      <ProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={handleAddProject} />
    </div>
  );
};

export default Dashboard;