import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useSelector } from 'react-redux';

Chart.register(...registerables);

export function LatencyChart() {
  const logs = useSelector(state => state.network.logs);

  const data = {
    labels: logs.map(l => new Date(l.timestamp).toLocaleTimeString()),
    datasets: [{
      label: 'Latency (ms)',
      data: logs.map(l => l.latency),
      borderColor: '#ff5252',
      tension: 0.1
    }]
  };

  return <Line data={data} />;
}

export function ThroughputChart() {
  const logs = useSelector(state => state.network.logs);

  const data = {
    labels: logs.map(l => new Date(l.timestamp).toLocaleTimeString()),
    datasets: [{
      label: 'Throughput (Mbps)',
      data: logs.map(l => l.throughput),
      backgroundColor: '#4db6ac'
    }]
  };

  return <Bar data={data} />;
}