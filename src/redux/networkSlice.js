import { createSlice } from '@reduxjs/toolkit';
import { faker } from '@faker-js/faker';

const initialState = {
  logs: [],
  anomalies: [],
  chartData: {
    labels: [],
    latency: [],
    signal: []
  },
  currentStatus: {
    latency: 28,
    signalStrength: 92,
    throughput: 150,
    location: 'Loading...', // Temporary placeholder
    lastUpdated: null
  }
};

// Safe data generator
const generateNetworkData = () => {
  let location;
  try {
    location = `${faker.location.city()}, ${faker.location.countryCode()}`;
  } catch {
    location = 'Base Station #' + Math.floor(Math.random() * 100);
  }

  return {
    latency: faker.number.int({ min: 10, max: 300 }),
    signalStrength: faker.number.int({ min: 10, max: 100 }),
    throughput: faker.number.int({ min: 50, max: 500 }),
    location
  };
};

export const networkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    updateStatus: (state) => {
      const newData = generateNetworkData();
      const timestamp = new Date().toLocaleTimeString();
      
      state.currentStatus = {
        ...newData,
        lastUpdated: timestamp
      };

      state.chartData = {
        labels: [...state.chartData.labels, timestamp].slice(-20),
        latency: [...state.chartData.latency, newData.latency].slice(-20),
        signal: [...state.chartData.signal, newData.signalStrength].slice(-20)
      };

      if (newData.latency > 100 || newData.signalStrength < 50) {
        state.anomalies.push({
          ...newData,
          timestamp,
          type: newData.latency > 100 ? 'High Latency' : 'Weak Signal'
        });
      }
    }
  }
});

export const { updateStatus } = networkSlice.actions;
export default networkSlice.reducer;


console.log('Updating at', new Date().toLocaleTimeString());