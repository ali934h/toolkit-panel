import React, { useState } from 'react';

function randomizeCase(str) {
  return str
    .split('')
    .map((char) => {
      if (char >= 'a' && char <= 'z') {
        return Math.random() < 0.4 ? char.toUpperCase() : char;
      }
      if (char >= 'A' && char <= 'Z') {
        return Math.random() < 0.4 ? char.toLowerCase() : char;
      }
      return char;
    })
    .join('');
}

function CaseRandomizer() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    if (!input.trim()) return;
    setOutput(randomizeCase(input.trim()));
    setCopied(false);
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleGenerate();
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-100">Case Randomizer</h2>
        <p className="text-slate-400 mt-1 text-sm">
          Enter a domain or word and randomly capitalize some letters.
        </p>
      </div>

      <div className="max-w-2xl space-y-5">
        {/* Input */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Input</label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. mirror.swiftcart.dpdns.org"
            className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 font-mono"
          />
        </div>

        {/* Generate button */}
        <button
          onClick={handleGenerate}
          disabled={!input.trim()}
          className="px-6 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 disabled:from-slate-700 disabled:to-slate-800 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Randomize
        </button>

        {/* Output */}
        {output && (
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Output</label>
            <div className="relative">
              <div className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 font-mono text-base break-all">
                {output}
              </div>
              <button
                onClick={handleCopy}
                className="absolute top-2 right-2 px-3 py-1 text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white rounded-md transition-all duration-150 flex items-center gap-1"
              >
                {copied ? (
                  <>
                    <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-green-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CaseRandomizer;
