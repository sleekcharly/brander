import React, { useState } from 'react';

type Props = {};

type ResultProps = {
  snippet: string;
  keywords: [];
};

const Brander = (props: Props) => {
  // set state parameters for the application
  const [prompt, setPrompt] = useState('');
  const [snippet, setSnippet] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [hasResult, setHasResult] = useState(false);

  //   api endpoint
  const ENDPOINT: string =
    'https://5z09phste9.execute-api.eu-west-2.amazonaws.com/prod/generate_snippet_and_keywords';

  // handle returned datafrom fetch api
  const onResult = (data: ResultProps) => {
    setSnippet(data.snippet);
    setKeywords(data.keywords);
    setHasResult(true);
  };

  //   function for handling submission of prompt
  const onSubmit = () => {
    fetch(`${ENDPOINT}?prompt=${prompt}`)
      .then((res) => res.json())
      .then(onResult);
  };

  //   Results element
  let resultsElement = null;

  //   populate resultsElement if hasResult is True
  if (hasResult) {
    resultsElement = (
      <div>
        Here are your results:
        <div>Snippet: {snippet}</div>
        <div>Keywords: {keywords.join(',')}</div>
      </div>
    );
  }

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

      {resultsElement}
    </>
  );
};

export default Brander;
