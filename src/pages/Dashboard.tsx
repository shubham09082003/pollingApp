import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import NavBar from '@/components/NavBar';
import { supabase } from '@/lib/supabaseClient';
import { UserAuth } from '@/context/AuthContext';

// Define the PollOption type
interface PollOption {
  votes: number;
  // Add other fields as necessary
}

// Define the Poll type
interface Poll {
  id: string;
  question: string;
  created_at: string;
  votes: PollOption[];
  // Add other fields as necessary
}

function Dashboard() {
  const navigate = useNavigate(); 
  const { session } = UserAuth();
  const [polls, setPolls] = useState<any[]>([]);

  const fetchPolls = async () => {
    const { data, error } = await supabase
      .from('polls')
      .select(`
        *,
        poll_options (
          votes
        )
      `)
      .eq('closed', false)
      .eq('creator_id', session?.user?.id);

    if (error) {
      console.error('Error fetching polls:', error);
    } else {
      setPolls(data);
    }
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="text-white p-6 min-h-screen bg-gray-900">
        <div className="">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className='flex gap-4'>
            <Button
              onClick={() => navigate('/create-poll')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300 mt-4"
            >
              + Create Poll
            </Button>
          </div>
        </div>
        <div className="mt-6">
          <div className="grid grid-cols-4 gap-4 text-gray-400 mb-2">
            <div>Polls</div>
            <div>Participants</div>
            <div>Deadline</div>
            <div>Status</div>
          </div>
          {polls.length > 0 ? (
            polls.map(poll => (
              <PollItem key={poll.id} poll={poll} refreshPolls={fetchPolls} onClick={() => navigate(`/poll/${poll.id}`)} />
            ))
          ) : (
            <p>No polls available</p>
          )}
        </div>
      </div>
    </div>
  );
}

function PollItem({ poll, refreshPolls, onClick }: { poll: Poll, refreshPolls: () => void, onClick: () => void }) {
  const handleClosePoll = async () => {
    const { error } = await supabase
      .from('polls')
      .update({ closed: true })
      .eq('id', poll.id);

    if (error) {
      console.error('Error closing poll:', error);
    } else {
      console.log('Poll closed successfully');
      refreshPolls(); // Refetch polls
    }
  };

  const totalVotes = poll.votes?.reduce((sum, option) => sum + option.votes, 0) || 0;

  return (
    <div className="grid grid-cols-4 gap-4 items-center bg-gray-800 p-4 rounded mb-4">
      <div className="flex items-center">
        <div className="bg-green-500 p-2 rounded-full">
          {/* Icon can be added here */}
        </div>
        <div className="ml-4">
          <h2 className="text-xl font-semibold cursor-pointer" onClick={onClick}>{poll.question}</h2>
          <p>{new Date(poll.created_at).toLocaleDateString()}</p>
        </div>
      </div>
      <div>{totalVotes}</div>
      <div>-</div> {/* Deadline */}
      <div className="flex items-center">
        <span className="bg-green-600 text-white px-2 py-1 rounded">Live</span>
        <button
          onClick={handleClosePoll}
          className="bg-red-600 text-white px-2 py-1 rounded ml-4"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
