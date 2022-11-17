import React from 'react';

type Props = {
  prompt: string;
  setPrompt: any;
  onSubmit: any;
  isLoading: boolean;
  characterLimit: number;
};

const Form = ({
  prompt,
  setPrompt,
  onSubmit,
  isLoading,
  characterLimit,
}: Props) => {
  // check if there is a valid prompt
  const isPromptValid = prompt.length < characterLimit;

  //   to ensure we don't type beyond the character limit
  const updatePromptValue = (text: string) => {
    if (text.length <= characterLimit) {
      setPrompt(text);
    }
  };

  //   status color and text
  let statusColor = 'text-slate-500';
  let statusText = null;
  if (!isPromptValid) {
    statusColor = 'text-red-400';
    statusText = `Input must be less than ${characterLimit} characters`;
  }

  return (
    <div>
      <div className="mb-6 text-slate-400">
        <p>
          Tell me what your brand is about and I will generate copy and keywords
          for you.
        </p>
      </div>

      <input
        className="p-2 rounded-md w-full focus:outline-teal-400 text-slate-700"
        type="text"
        placeholder="New gucci shoes"
        value={prompt}
        onChange={(e) => updatePromptValue(e.currentTarget.value)}
      ></input>
      <div className={`${statusColor} flex justify-between my-2 mb-6 text-xs`}>
        <div>{statusText}</div>
        <div>
          {prompt.length}/{characterLimit}
        </div>
      </div>
      <button
        className="bg-gradient-to-r from-teal-400 to-blue-500 disabled:opacity-50 w-full p-2 rounded-md text-lg"
        disabled={isLoading || !isPromptValid || prompt.length == 0}
        onClick={onSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default Form;
