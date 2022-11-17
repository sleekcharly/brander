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
  const isPromptValid = prompt.length <= characterLimit;

  //   to ensure we don't type beyond the character limit
  const updatePromptValue = (text: string) => {
    if (text.length <= characterLimit) {
      setPrompt(text);
    }
  };
  return (
    <div>
      <p>
        Tell me what your brand is about and I will generate copy and keywords
        for you.
      </p>
      <input
        type="text"
        placeholder="shoes"
        value={prompt}
        onChange={(e) => updatePromptValue(e.currentTarget.value)}
      ></input>
      <div>
        {prompt.length}/{characterLimit}
      </div>
      <button disabled={isLoading || !isPromptValid} onClick={onSubmit}>
        Submit
      </button>
    </div>
  );
};

export default Form;
