import React, { useState } from 'react';
import Form from './form';
import Results from './results';
import Image from 'next/image';
// import logo image
import logo from '../public/logo.svg';

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

  //   set text style gradient
  const gradientTextStyle =
    'text-white text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500';

  return (
    <div className="h-screen flex">
      <div className="max-w-md m-auto p-2">
        <div className="bg-slate-800 p-6 rounded-md text-white">
          <div className="flex flex-col items-center my-6">
            <Image
              src={logo}
              alt="Brander-app-image"
              width={64}
              height={64}
              className="rounded-lg"
            />
            <h1 className={`${gradientTextStyle} text-3xl font-light w-fit`}>
              Brander
            </h1>
            <div className={gradientTextStyle}>
              Your AI tailored branding assistant
            </div>
          </div>
          {/* displayed element */}
          {displayedElement}
        </div>
      </div>
    </div>
  );
};

export default Brander;
