import { useCallback, useEffect, useRef } from "react";
import { useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%&*_-+/|~`";
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, password.length);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-linear-to-r from-indigo-200 to-blue-400">
        <div className="w-full max-w-md mx-auto rounded-xl px-5 py-5 my-8 bg-slate-800 text-white justify-center">
          <h1 className="flex justify-center m-5 text-2xl font-semibold text-white">
            Password Generator
          </h1>
          <div className="flex shadow rounded-xl overflow-hidden mb-4 bg-white">
            <input
              type="text"
              value={password}
              placeholder="Password"
              className="bg-white w-full py-2 px-4 text-slate-900"
              readOnly
              ref={passwordRef}
            />
            <button
              className="bg-blue-500 px-4 text-white shrink-0 hover:bg-blue-600"
              onClick={copyPasswordToClipboard}
            >
              Copy
            </button>
          </div>
          <div className="flex text-sm gap-x-2 flex-wrap">
            <div className="flex items-center gap-x-1 text-slate-200">
              <input
                type="range"
                min={6}
                max={30}
                value={length}
                className="cursor-pointer accent-blue-500"
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
              <label>Length: {length}</label>
            </div>
            <div className="flex items-center gap-x-1 text-slate-200">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
              />
              <label>Numbers</label>
            </div>
            <div className="flex items-center gap-x-1 text-slate-200">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id="charInput"
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
              />
              <label>Characters</label>
            </div>
            <div className="flex justify-center w-full">
              <button
                onClick={passwordGenerator}
                className=" bg-blue-500 hover:bg-blue-600 px-4 py-3 rounded-xl mt-5 mb-px w-70 text-lg cursor-pointer"
              >
                Generate Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
