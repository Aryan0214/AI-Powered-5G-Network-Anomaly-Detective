import React from 'react';
import { useSelector } from 'react-redux';

export default function AIResponses() {
  const responses = useSelector(state => state.network.aiResponses);

  return (
    <div className="h-96 overflow-y-auto p-4 bg-gray-800 rounded-lg">
      <h3 className="text-xl font-bold mb-4">AI Analysis History</h3>
      {responses.slice(-5).reverse().map(response => (
        <div key={response.id} className="ai-response">
          <p className="text-sm text-gray-400 mb-1">
            {new Date(response.timestamp).toLocaleTimeString()}
          </p>
          <div className="whitespace-pre-wrap text-gray-200">
            {response.response}
          </div>
        </div>
      ))}
    </div>
  );
}