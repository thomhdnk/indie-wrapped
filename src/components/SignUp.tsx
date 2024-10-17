import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Twitter, Github, Mail } from 'lucide-react';

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const handleSignUp = (provider: string) => {
    console.log(`Signing up with ${provider}`);
    // Implement actual authentication logic here
  };

  const handleSkip = () => {
    navigate('/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up for Indie Wrapped</h1>
        <div className="space-y-4">
          <button
            onClick={() => handleSignUp('X')}
            className="w-full flex items-center justify-center bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800"
          >
            <Twitter className="mr-2" size={20} /> Sign up with X
          </button>
          <button
            onClick={() => handleSignUp('Google')}
            className="w-full flex items-center justify-center bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
          >
            <Mail className="mr-2" size={20} /> Sign up with Google
          </button>
          <button
            onClick={() => handleSignUp('GitHub')}
            className="w-full flex items-center justify-center bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700"
          >
            <Github className="mr-2" size={20} /> Sign up with GitHub
          </button>
        </div>
        <button
          onClick={handleSkip}
          className="w-full mt-4 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300"
        >
          Skip (For Testing)
        </button>
      </div>
    </div>
  );
};

export default SignUp;