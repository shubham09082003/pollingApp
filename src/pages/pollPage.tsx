import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import NavBar from '@/components/NavBar';
import { getSessionId } from '@/lib/utils';
import { UserAuth } from '@/context/AuthContext';

function PollPage() {
    const { id } = useParams();
    const { session } = UserAuth();
    const [poll, setPoll] = useState<any>(null);
    const [selectedOption, setSelectedOption] = useState<string>("");
    const [userVoted, setUserVoted] = useState<boolean>(false);

    useEffect( () => {
        async function fetchPoll() {
          const { data, error } = await supabase
            .from("polls")
            .select(`
              id,
              question,
              type,
              closed,
              created_at,
              poll_options (
                id,
                option_text,
                votes
              )
            `)
            .eq("id", id)
            .single();
    
          if (error) {
            console.error("Error fetching poll:", error.message);
          } else {
            setPoll(data);
          }
        }

        async function fetchUser() {
          const sessionId = await getSessionId();
          const voterId = session?.user?.id || null;
          console.log(sessionId,voterId);

            let query = supabase.from("poll_responses").select("*").eq("poll_id", id);

            if (voterId) {
                query = query.eq("voter_id", voterId);
            } else if (sessionId) {
                query = query.eq("session_id", sessionId);
            } else {
                console.error("No valid identifier for user or session.");
                return;
            }

            const { data, error } = await query;
            console.log(data);  

            if (error) {
                console.error("Error fetching user:", error.message);
            } else if (data.length > 1) {
                console.error("Multiple responses found for the user.");
                setUserVoted(true); // or handle it as needed
            } else if (data.length === 1) {
                setUserVoted(true);
            } else {
                setUserVoted(false);
            }
        }
    
        fetchUser();
        fetchPoll();
    }, [id,session]);

      

      const handleVote = async (optionId: string) => {
        const sessionId = await getSessionId();
        const userId = session?.user?.id || null;

        // Ensure sessionId is used only when userId is null
        const validVoterId = userId || null;

        // Insert the vote into poll_responses
        const { data: responseData, error: responseError } = await supabase
          .from("poll_responses")
          .insert({
            poll_id: id,
            voter_id: validVoterId, // Use userId if available, otherwise null
            session_id: sessionId, // Use sessionId only if userId is null
            option_id: optionId,
          });

        if (responseError) {
          console.error("Error recording vote:", responseError.message);
          return;
        }

        // Fetch the current vote count
        const { data: optionData, error: optionFetchError } = await supabase
          .from("poll_options")
          .select("votes")
          .eq("id", optionId)
          .single();

        if (optionFetchError) {
          console.error("Error fetching vote count:", optionFetchError.message);
          return;
        }
        const newVoteCount = optionData.votes + 1;

        const { error: optionUpdateError } = await supabase
          .from("poll_options")
          .update({ votes: newVoteCount })
          .eq("id", optionId);

        if (optionUpdateError) {
          console.error("Error updating vote count:", optionUpdateError.message);
        } else {
          console.log("Vote recorded and count updated successfully");
        }
      }


  return (
    <div>
        <NavBar />
        <div className="bg-gray-900 min-h-screen flex flex-col items-center p-6">   
        <div className="bg-gray-800 text-white w-full max-w-2xl p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-2">{poll?.question}</h1>
            {/* <p className="text-sm text-gray-400 mb-4"> · just now</p> */}
            <p className="mb-4">Make a choice:</p>
            <div className="mb-4">
            {poll?.poll_options.map((option: any) => (
                <div key={option.id} className="flex items-center mb-2">
                    <input type="radio" name="option" className="mr-2" onClick={() => setSelectedOption(option.id)} />
                    <label>{option.option_text}</label>
                </div>
            ))}
            </div>
            <div className="flex gap-4 items-center">
            {userVoted ? (
                <p className="mb-4">You have already voted</p>
            ) : (
                <Button className="bg-blue-600 text-white hover:bg-blue-700 transition duration-300 py-2 px-4 rounded-md" onClick={() => handleVote(selectedOption)}>
                    Vote
                </Button>
            )}
            <Button className="bg-gray-600 text-white hover:bg-gray-700 transition duration-300 py-2 px-4 rounded-md">
                Show results
            </Button>
            </div>
        </div>
        <div className="bg-gray-800 text-white w-full max-w-2xl p-6 mt-6 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-2">Share</h2>
            <p className="text-sm text-gray-400 mb-2">Share the link</p>
            <div className="flex items-center bg-gray-700 p-2 rounded-md">
            <input type="text" value={`https://localhost:5173/poll/${id}`} readOnly className="bg-transparent text-white flex-grow mr-2" />
            <Button className="bg-blue-600 text-white hover:bg-blue-700 transition duration-300 py-1 px-3 rounded-md">
                Copy
            </Button>
            </div>
        </div>
        </div>
        </div>
  );
}

export default PollPage;