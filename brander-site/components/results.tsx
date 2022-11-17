import React from 'react';

type Props = {
  snippet: string;
  keywords: string[];
  onBack: any;
  prompt: string;
};

// keywords container
const keywordsContainer = (element: any) => (
  <div className="flex flex-wrap gap-2">{element}</div>
);

// result section
const resultSection = (label: string, body: any) => {
  return (
    <div className="bg-slate-700 my-3 rounded-md p-4">
      <div className="text-slate-500 text-sm font-bold mb-4">{label}</div>
      <div>{body}</div>
    </div>
  );
};

const Results = ({ snippet, keywords, onBack, prompt }: Props) => {
  return (
    <>
      <div className="mb-4">
        {resultSection(
          'Prompt',
          <div className="text-xl font-bold">{prompt}</div>,
        )}
        {resultSection('Branding Snippet', snippet)}
        {resultSection(
          'Keywords',
          keywordsContainer(
            keywords.map((word, i) => (
              <div
                key={i}
                className="bg-teal-800 p-1 text-teal-400 px-2 text-sm rounded-md"
              >
                #{word}
              </div>
            )),
          ),
        )}
      </div>

      <button
        className="bg-gradient-to-r from-teal-400 to-blue-500 disabled:opacity-50 w-full p-2 rounded-md text-lg"
        onClick={onBack}
      >
        Back
      </button>
    </>
  );
};

export default Results;
