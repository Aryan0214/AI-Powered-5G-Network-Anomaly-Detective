import { store } from './store';
import { updateStatus } from './networkSlice';

let updateInterval = null;
const UPDATE_INTERVAL_MS = 2000; 
export const startDataUpdates = () => {
  if (!updateInterval) {
    // Initial immediate update
    store.dispatch(updateStatus());
    
    // Set up regular 5-second updates
    updateInterval = setInterval(() => {
      store.dispatch(updateStatus());
    }, UPDATE_INTERVAL_MS);
  }
};

export const stopDataUpdates = () => {
  if (updateInterval) {
    clearInterval(updateInterval);
    updateInterval = null;
  }
};