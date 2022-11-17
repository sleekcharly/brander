import React, { useState } from 'react';
import Form from './form';
import Results from './results';

type Props = {};

type ResultProps = {
  snippet: string;
  keywords: [];
};

const Brander = (props: Props) => {
  // set charcterLimit
  const characterLimit: number = 32;

  // set state parameters for the application
  const [prompt, setPrompt] = useState('');
  const [snippet, setSnippet] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [hasResult, setHasResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //   api endpoint
  const ENDPOINT: string =
    'https://5z09phste9.execute-api.eu-west-2.amazonaws.com/prod/generate_snippet_and_keywords';

  // handle returned datafrom fetch api
  const onResult = (data: ResultProps) => {
    setSnippet(data.snippet);
    setKeywords(data.keywords);
    setHasResult(true);
    setIsLoading(false);
  };

  //   function for handling submission of prompt
  const onSubmit = () => {
    console.log('Submitting: ' + prompt);
    setIsLoading(true);

    fetch(`${ENDPOINT}?prompt=${prompt}`)
      .then((res) => res.json())
      .then(onResult);
  };

  // function to handle resetting set when the back button is clicked
  const onReset = () => {
    setPrompt('');
    setHasResult(false);
    setIsLoading(false);
  };

  //   Results element
  let displayedElement = null;

  //   populate displayedElement if hasResult is True with Reselts or Form element
  if (hasResult) {
    displayedElement = (
      <Results
        snippet={snippet}
        keywords={keywords}
        onBack={onReset}
        prompt={prompt}
      />
    );
  } else {
    displayedElement = (
      <Form
        prompt={prompt}
        onSubmit={onSubmit}
        setPrompt={setPrompt}
        characterLimit={characterLimit}
        isLoading={isLoading}
      />
    );
  }

  return (
    <>
      <h1>Brander</h1>
      {/* form component */}

      {displayedElement}
    </>
  );
};

export default Brander;
