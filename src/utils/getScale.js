import config from '../config/index.js';

const { seedScale } = config;
const scale = parseFloat(seedScale || '1');

const scaled = base => {
  return Math.max(1, Math.floor(base * scale));
};

export default scaled;
