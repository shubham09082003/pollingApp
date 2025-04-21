import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button" 
import { useState } from "react";
import { UserAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import NavBar from "@/components/NavBar";
import { useNavigate } from "react-router-dom";

function CreatePoll() {
  const [options, setOptions] = useState<string[]>(['']);
  const [title, setTitle] = useState<string>("");
  const { session } = UserAuth(); 
  const navigate = useNavigate();

  const handleDeleteOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  }

  const handleCreatePoll = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || options.some(option => !option)) {
      alert("Please fill in all fields.");
      return;
    }

    const { data : pollData , error : pollError } = await supabase.from('polls').insert({
      question: title,
      type: "single-choice",
      creator_id: session?.user.id,
      closed : false,
    }).select().single();

    if (pollError) {
      console.log(pollError);
      alert(pollError.message);
      return;
    }

    const { data : optionData , error : optionError } = await supabase.from('poll_options').insert(options.map(option => ({
      poll_id: pollData.id,
      option_text: option,
    }))); 

    if (optionError) {
      console.log(optionError);
      alert(optionError.message);
      return;
    }

    alert("Poll and options created successfully");
    setTitle('');
    setOptions(['']);
    navigate(`/poll/${pollData.id}`);
  }

  return (
    <div className="bg-gray-900 h-screen">
      <NavBar />  
      <div className="w-full flex flex-col items-center mt-10">
      <h1 className="text-3xl font-bold mb-2 text-white">Create a New Poll</h1>
      <h1 className="text-xl mb-6 text-gray-400">Complete the form below to create a new poll</h1>
      <div className="flex flex-col gap-6 w-full max-w-lg bg-gray-800 p-8 rounded-lg shadow-lg">
        <form className="flex flex-col gap-4" onSubmit={handleCreatePoll}>
          <h1 className="text-white">Poll Title</h1> 
          <Input
            type="text"
            placeholder="Enter Poll Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <h1 className="text-white">Options</h1>
          {options.map((option, index) => ( 
            <div key={index} className="flex items-center gap-3">
              <Input
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => setOptions(options.map((o, i) => i === index ? e.target.value : o))}
                className="border text-white border-gray-300 p-3 rounded-md flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <img src={"/delete_icon.png"} alt="Delete" className="w-4 h-4 cursor-pointer" onClick={() => handleDeleteOption(index)} />
            </div>  
          ))}
          <div className="flex gap-4">
          <Button
            type="button"
            onClick={() => setOptions([...options, ''])}
            className="bg-gray-600 text-white w-[50%] hover:bg-gray-700 transition duration-300 py-2 px-4 rounded-md"
          >
            Add Option
          </Button>
          <Button
            type="submit"
            className="bg-blue-600 text-white w-[50%] hover:bg-blue-700 transition duration-300 py-3 px-4 rounded-md"
          >
            Create Poll
          </Button>
          </div>
        </form>
      </div>
      </div>
    </div>
  )
}

export default CreatePoll