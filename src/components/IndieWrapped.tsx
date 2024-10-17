import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { format } from 'date-fns';

interface Project {
  id: number;
  name: string;
  arr: number;
  users: number;
  launchDate: string;
}

interface UserInfo {
  name: string;
  followers: string;
  avatar: string;
}

const colorStyles = [
  { bg: 'bg-green-400', text: 'text-blue-900' },
  { bg: 'bg-purple-400', text: 'text-yellow-300' },
  { bg: 'bg-pink-400', text: 'text-indigo-900' },
];

const IndieWrapped: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { projects, userInfo } = location.state as { projects: Project[], userInfo: UserInfo };
  const [selectedStyle, setSelectedStyle] = useState(0);
  const wrappedRef = useRef<HTMLDivElement>(null);

  const totalARR = projects.reduce((sum, project) => sum + project.arr, 0);
  const totalUsers = projects.reduce((sum, project) => sum + project.users, 0);
  const mostRecentProject = projects.reduce((recent, project) => 
    new Date(project.launchDate) > new Date(recent.launchDate) ? project : recent
  );
  const topPerformingProject = projects.reduce((top, project) => 
    project.arr > top.arr ? project : top
  );

  const handleDownload = () => {
    if (wrappedRef.current) {
      html2canvas(wrappedRef.current).then((canvas) => {
        const link = document.createElement('a');
        link.download = 'indie-wrapped.png';
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <button onClick={() => navigate('/dashboard')} className="bg-gray-200 px-4 py-2 rounded mr-2">
          Back to Dashboard
        </button>
        <button onClick={handleDownload} className="bg-blue-500 text-white px-4 py-2 rounded">
          Download PNG
        </button>
      </div>

      <div className="mb-4">
        {colorStyles.map((style, index) => (
          <button
            key={index}
            onClick={() => setSelectedStyle(index)}
            className={`w-8 h-8 rounded-full mr-2 ${style.bg}`}
          />
        ))}
      </div>

      <div
        ref={wrappedRef}
        className={`${colorStyles[selectedStyle].bg} ${colorStyles[selectedStyle].text} p-8 rounded-lg shadow-lg aspect-square`}
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Indie Wrapped 2024</h1>
          <div className="flex flex-col items-center justify-center mb-4">
            {userInfo.avatar && (
              <img src={userInfo.avatar} alt="User Avatar" className="w-24 h-24 rounded-full mb-2" />
            )}
            <h2 className="text-3xl font-semibold">{userInfo.name}</h2>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-1">Total ARR</h3>
            <p className="text-2xl font-bold">${totalARR.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold mb-1">Startups Launched</h3>
            <p className="text-2xl font-bold">{projects.length}</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold mb-1">Top Performing</h3>
            <p className="text-2xl font-bold">{topPerformingProject.name}</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold mb-1">Total Followers</h3>
            <p className="text-2xl font-bold">{userInfo.followers}</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold mb-1">Latest Startup</h3>
            <p className="text-2xl font-bold">{mostRecentProject.name}</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold mb-1">Total Users</h3>
            <p className="text-2xl font-bold">{totalUsers.toLocaleString()}</p>
          </div>
        </div>

        <div className="mt-8 text-center text-sm opacity-75">
          #indiewrapped2024 | indiewrapped.twoheads.cc
        </div>
      </div>
    </div>
  );
};

export default IndieWrapped;