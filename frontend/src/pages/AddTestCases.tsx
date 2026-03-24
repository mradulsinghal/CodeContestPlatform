import axios from "axios";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import { getAccessToken } from "../Auth/Tokens";
import { BACKEND_URL } from "../Auth/role";

export function AddTestCases() {
  const { newProblemId } = useParams();
  const VisInputRef = useRef<HTMLTextAreaElement>(null);
  const VisOutputRef = useRef<HTMLTextAreaElement>(null);
  const HidInputRef = useRef<HTMLTextAreaElement>(null);
  const HidOutputRef = useRef<HTMLTextAreaElement>(null);

  function VisAdd() {
    const Input = VisInputRef.current?.value;
    const Output = VisOutputRef.current?.value;
    if (!Input || !Output) return alert("VisibleTest Box is empty");

    async function addtest() {
      const result = await axios.post(
        `${BACKEND_URL}/submit/visibletestcase/${newProblemId}`,
        {
          input: Input,
          output: Output,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`,
          },
        },
      );
      if (result.data) alert("TestCase Added");
      else alert("TestCase failed to add");
    }
    addtest();
  }

  function HidAdd() {
    const Input = HidInputRef.current?.value;
    const Output = HidOutputRef.current?.value;
    if (!Input || !Output) return alert("HiddenTest Box is empty");

    async function addtest() {
      const result = await axios.post(
        `${BACKEND_URL}/submit/hiddentestcase/${newProblemId}`,
        {
          input: Input,
          output: Output,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`,
          },
        },
      );
      if (result.data) alert("TestCase Added");
      else alert("TestCase failed to add");
    }
    addtest();
  }

  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center text-black">
        <div className="w-fit p-2 h-fit mx-20 flex justify-center items-center rounded-2xl border border-white/50 gap-10">
          <div className="border border-white/50 h-140 w-130 rounded-xl grid justify-center items-center p-4">
            <div className="w-120 h-10 text-2xl flex justify-center font-sans text-white border border-white/50 rounded mb-4">
              VisibleTestCase
            </div>
            <div className="w-120 h-30">
              <textarea
                ref={VisInputRef}
                placeholder="Enter Input"
                className="h-[100px] w-full bg-amber-100 border border-white/50 focus:outline-black p-2"
              ></textarea>
            </div>
            <div className="w-120 h-30 mt-4">
              <textarea
                ref={VisOutputRef}
                placeholder="Enter Output"
                className="h-[100px] w-full bg-amber-100 border border-white/50 focus:outline-black p-2"
              ></textarea>
            </div>
            <div className="w-120 flex justify-center mt-4">
              <button
                onClick={VisAdd}
                className="bg-sky-300 px-6 py-2 rounded-3xl border border-white/50 hover:animate-pulse hover:cursor-pointer text-xl font-medium"
              >
                ADD
              </button>
            </div>
          </div>
          <div className="border border-white/50 h-140 w-130 rounded-xl grid justify-center items-center p-4">
            <div className="w-120 h-10 text-2xl flex justify-center font-sans text-white border border-white/50 rounded mb-4">
              HiddenTestCase
            </div>
            <div className="w-120 h-30">
              <textarea
                ref={HidInputRef}
                placeholder="Enter Input"
                className="h-[100px] w-full bg-amber-100 border border-white/50 focus:outline-black p-2"
              ></textarea>
            </div>
            <div className="w-120 h-30 mt-4">
              <textarea
                ref={HidOutputRef}
                placeholder="Enter Output"
                className="h-[100px] w-full bg-amber-100 border border-white/50 focus:outline-black p-2"
              ></textarea>
            </div>
            <div className="w-120 flex justify-center mt-4">
              <button
                onClick={HidAdd}
                className="bg-sky-300 px-6 py-2 rounded-3xl border border-white/50 hover:animate-pulse hover:cursor-pointer text-xl font-medium"
              >
                ADD
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
