import React, { useState } from 'react';

type Props = {};

const Brander = (props: Props) => {
  // set state parameters for the application
  const [prompt, setPrompt] = useState('');

  //   api endpoint
  const ENDPOINT: string =
    'https://5z09phste9.execute-api.eu-west-2.amazonaws.com/prod/generate_snippet_and_keywords';

  //   function for handling submission of prompt
  const onSubmit = () => {
    fetch(`${ENDPOINT}?prompt=${prompt}`)
      .then((res) => res.json())
      .then(console.log);
  };

  return (
    <>
      <h1>Brander</h1>
      <p>
        Tell me what your brand is about and I will generate copy and keywords
        for you.
      </p>
      <input
        type="text"
        placeholder="shoes"
        value={prompt}
        onChange={(e) => setPrompt(e.currentTarget.value)}
      ></input>
      <button onClick={onSubmit}>Submit</button>
    </>
  );
};

export default Brander;
