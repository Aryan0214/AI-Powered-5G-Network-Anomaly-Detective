import React, { useEffect, useRef } from 'react';
import { Chart, LinearScale, CategoryScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

// ONLY register what we need
Chart.register(LinearScale, CategoryScale, PointElement, LineElement, Tooltip, Legend);

export default function NetworkChart({ data }) {
  const chartRef = useRef(null);

  // Destroy chart on unmount
  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, []);

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Latency (ms)',
        data: data.latency,
        borderColor: '#ef4444', // red-500
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4
      },
      {
        label: 'Signal (dBm)',
        data: data.signal,
        borderColor: '#4db6ac', // teal-400
        backgroundColor: 'rgba(77, 182, 172, 0.1)',
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: false
      }
    }
  };

  return <Line ref={chartRef} data={chartData} options={options} />;
}