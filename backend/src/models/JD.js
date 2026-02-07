const mongoose = require('mongoose');

const JDSchema = new mongoose.Schema({
  title: { type: String },
  rawText: { type: String, required: true },
  parsed: { type: Object },
  confidence: { type: Number },
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('JD', JDSchema);
