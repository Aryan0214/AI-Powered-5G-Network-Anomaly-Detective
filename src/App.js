import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startDataUpdates, stopDataUpdates } from './redux/dataUpdater';
import MetricCard from './components/MetricCard';
import NetworkChart from './components/NetworkChart';

function App() {
  const dispatch = useDispatch();
  const { currentStatus, anomalies, chartData } = useSelector(state => state.network);

  useEffect(() => {
    startDataUpdates();
    return () => stopDataUpdates();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-nokia-dark text-white p-6">
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-nokia-teal">Nokia 5G Network Monitor</h1>
            <p className="text-gray-400">AI-Powered Anomaly Detection</p>
          </div>
          <div className="text-sm bg-gray-800/50 px-4 py-2 rounded-lg border border-gray-700">
            <p>Last updated: {currentStatus.lastUpdated}</p>
            <p>Location: {currentStatus.location}</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Status Cards Column */}
        <div className="space-y-6">
          <div className={`p-6 rounded-xl border ${
            anomalies.length ? 'border-red-500 bg-red-900/20' : 'border-green-500 bg-green-900/20'
          }`}>
            <h2 className="text-xl font-semibold mb-2 flex items-center">
              {anomalies.length ? '🚨' : '✅'}
              <span className="ml-2">
                {anomalies.length ? `${anomalies.length} Active Alerts` : 'All Systems Normal'}
              </span>
            </h2>
            {anomalies.length > 0 && (
              <div className="mt-2 text-sm">
                Latest: {anomalies[anomalies.length-1].type}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <MetricCard 
              title="Latency" 
              value={`${currentStatus.latency}ms`} 
              good={currentStatus.latency < 100}
            />
            <MetricCard 
              title="Signal" 
              value={`${currentStatus.signalStrength}dBm`} 
              good={currentStatus.signalStrength > 50}
            />
            <MetricCard 
              title="Throughput" 
              value={`${currentStatus.throughput}Mbps`} 
              good={currentStatus.throughput > 100}
            />
          </div>
        </div>

        {/* Chart Column */}
        <div className="lg:col-span-2">
          <NetworkChart data={chartData} />
        </div>
      </div>
    </div>
  );
}

export default App;