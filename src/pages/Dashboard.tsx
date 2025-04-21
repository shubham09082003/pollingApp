import { useState } from 'react';
import CreatePoll from '@/components/CreatePoll';
import { Button } from '@/components/ui/button';
import { UserAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';


function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const { signOut } = UserAuth();
  const navigate = useNavigate();


  function handleSignOut() {
    signOut();
    navigate('/');
  }

  return (
    <div className="text-white p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className='flex gap-4'>
          <Button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            + Create Poll
          </Button>
          <Button className= "text-white font-semibold py-2 px-4 rounded border-2 border-white" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-black">
          <div className="bg-black shadow-lg shadow-white rounded-lg p-6 w-full max-w-lg overflow-y-auto h-[60vh]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Create New Poll</h2>
              <Button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white text-xl"
              >
                &times;
              </Button>
            </div>

            <CreatePoll onClose={() => setShowModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
