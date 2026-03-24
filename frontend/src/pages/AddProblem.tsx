import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../Auth/Tokens";
import { BACKEND_URL } from "../Auth/role";

export function AddProblem() {
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const memoryRef = useRef<HTMLTextAreaElement>(null);
  const timeRef = useRef<HTMLTextAreaElement>(null);
  const difficultyRef = useRef<HTMLTextAreaElement>(null);
  const tagsRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  function probAdd() {
    const title = titleRef.current?.value;
    const description = descriptionRef.current?.value;
    const memory = memoryRef.current?.value;
    const time = timeRef.current?.value;
    const difficulty = difficultyRef.current?.value;
    const tags = tagsRef.current?.value;
    const arrTags = tags?.split(",");

    if (!title || !description || !memory || !time || !difficulty || !tags) {
      alert("Fill all the details");
      return;
    }

    async function update() {
      try {
        const result = await axios.post(
          `${BACKEND_URL}/submit/problem`,
          {
            title: title,
            description: description,
            difficulty: difficulty,
            tags: arrTags,
            timeLimit: Number(time),
            memoryLimit: Number(memory),
          },
          {
            headers: {
              Authorization: `Bearer ${getAccessToken()}`,
              "Content-Type": "application/json",
            },
          },
        );
        navigate(`/addTestcases/${result.data.problemId}`);
      } catch (e) {
        console.error(e);
      }
    }
    update();
  }

  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center text-black">
        <div className="w-180 h-180 mt-25 rounded-xl overflow-y-auto grid gap-3 justify-center pt-1 border border-white/60 p-4">
          <div className="h-20 w-150 bg-amber-100">
            <textarea
              ref={titleRef}
              className="w-full h-full focus:outline-black border border-black p-2"
              placeholder="Enter the Title"
            ></textarea>
          </div>
          <div className="h-50 w-150 bg-amber-100">
            <textarea
              ref={descriptionRef}
              className="w-full h-full focus:outline-black border border-black p-2"
              placeholder="Enter the Description"
            ></textarea>
          </div>
          <div className="h-10 w-150 bg-amber-100">
            <textarea
              ref={difficultyRef}
              className="w-full h-full focus:outline-black border border-black p-2"
              placeholder="Difficulty: EASY | MEDIUM | HARD"
            ></textarea>
          </div>
          <div className="h-10 w-150 bg-amber-100">
            <textarea
              ref={memoryRef}
              className="w-full h-full focus:outline-black border border-black p-2"
              placeholder="Enter Memory size (in mb)"
            ></textarea>
          </div>
          <div className="h-10 w-150 bg-amber-100">
            <textarea
              ref={timeRef}
              className="w-full h-full focus:outline-black border border-black p-2"
              placeholder="Enter the TimeLimit (in ms)"
            ></textarea>
          </div>
          <div className="h-20 w-150 bg-amber-100">
            <textarea
              ref={tagsRef}
              className="w-full h-full focus:outline-black border border-black p-2"
              placeholder="Enter Tags: (Eg: Array,String)"
            ></textarea>
          </div>
          <button
            onClick={probAdd}
            className="bg-sky-400 w-40 rounded-3xl flex justify-center items-center mb-1 hover:cursor-pointer hover:animate-pulse select-none py-2 text-white font-bold"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
