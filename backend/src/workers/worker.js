// Minimal worker entry used by docker-compose worker service
require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongodb:27017/ai_assessment';

mongoose.connect(MONGO_URI).then(() => {
  console.log('Worker connected to MongoDB');
  // placeholder - real background jobs go here
  setInterval(() => console.log('worker heartbeat'), 60_000);
}).catch(err => {
  console.error('Worker Mongo connection failed', err);
  process.exit(1);
});
