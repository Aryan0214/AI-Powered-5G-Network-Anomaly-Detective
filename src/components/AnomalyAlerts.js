import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAIResponse } from '../redux/networkSlice';

// Mock AI response (no API needed)
const mockAIResponse = (log) => {
  const issues = [];
  if (log.latency > 100) issues.push('High latency');
  if (log.signalStrength < 50) issues.push('Weak signal');
  
  return `Nokia 5G AI Analysis:
${issues.join(' and ')} detected. 
Recommended actions:
1. Check base station connections
2. Verify antenna alignment
3. Review spectrum allocation`;
};

export default function AnomalyAlerts() {
  const dispatch = useDispatch();
  const anomalies = useSelector(state => state.network.anomalies);

  const handleAnalyze = (anomaly) => {
    const response = mockAIResponse(anomaly);
    dispatch(addAIResponse({
      id: anomaly.id,
      query: `Anomaly at ${new Date(anomaly.timestamp).toLocaleTimeString()}`,
      response,
      timestamp: new Date().toISOString()
    }));
  };

  return (
    <div className="anomaly-alert">
      <h3 className="text-xl font-bold mb-2">🚨 {anomalies.length} Active Anomalies</h3>
      {anomalies.slice(-3).map(anomaly => (
        <div key={anomaly.id} className="mb-3">
          <p className="text-sm">
            Latency: {anomaly.latency}ms | Signal: {anomaly.signalStrength}dBm
          </p>
          <button
            onClick={() => handleAnalyze(anomaly)}
            className="mt-1 bg-nokia-teal text-black px-3 py-1 rounded hover:bg-opacity-80 text-sm"
          >
            Analyze with AI
          </button>
        </div>
      ))}
    </div>
  );
}