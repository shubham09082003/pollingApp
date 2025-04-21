import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useState } from "react";
import { UserAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabaseClient";

function CreatePoll( {onClose} : {onClose : () => void}) {
  const [options, setOptions] = useState<string[]>(['']);
  const [title, setTitle] = useState<string>("");
  const { session } = UserAuth(); 

  const handleDeleteOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  }

  const handleCreatePoll = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data : pollData , error : pollError } = await supabase.from('polls').insert({
      question: title,
      type: "single-choice",
      creator_id: session?.user.id,
      closed : false,
    }).select().single();

    if (pollError) {
      console.log(pollError);
      alert(pollError.message);
    }

    if (pollData) {
      alert("Poll created successfully");
    }

    const { data : optionData , error : optionError } = await supabase.from('poll_options').insert(options.map(option => ({
      poll_id: pollData.id,
      option_text: option,
    }))); 

    if (optionError) {
      console.log(optionError);
      alert(optionError.message);
    }

    if (optionData) {
      alert("Options created successfully");
    }
  }

  return (
    <div className="w-full flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold">Create Poll</h1>
      <div className="flex flex-col gap-4 w-[60%]">
        <form className="flex flex-col gap-4" onSubmit={handleCreatePoll}>
          <Input type="text" placeholder="Poll Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        {options.map((option, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input key={index} type="text" placeholder={`Option ${index + 1}`} value={option} onChange={(e) => setOptions(options.map((o, i) => i === index ? e.target.value : o))} />
            <img src={"/delete_icon.png"} alt="delete" onClick={() => handleDeleteOption(index)} className="w-4 h-4 cursor-pointer" />
          </div>  
          ))}
          <Button type="button" onClick={() => setOptions([...options, ''])}>Add Option</Button>
          <Button type="submit">Create Poll</Button>
        </form>
      </div>
    </div>
  )
}

export default CreatePoll