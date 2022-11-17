import React from 'react';

type Props = {
  snippet: string;
  keywords: string[];
  onBack: any;
  prompt: string;
};

const Results = ({ snippet, keywords, onBack, prompt }: Props) => {
  return (
    <>
      <div>
        <div>
          <div>
            <b>Prompt</b>
          </div>
          {prompt}
        </div>
        <div>
          <div>
            <b>Snippet</b>
          </div>
          {snippet}
        </div>
        <div>
          <div>
            <b>Keywords</b>
          </div>
          {keywords.map((word, i) => (
            <div key={i}>#{word}</div>
          ))}
        </div>
      </div>

      <button onClick={onBack}>Back</button>
    </>
  );
};

export default Results;
