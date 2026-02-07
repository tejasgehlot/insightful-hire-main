const express = require('express');
const multer = require('multer');
const pdf = require('pdf-parse');
const axios = require('axios');
const JD = require('../models/JD');
const { authenticate } = require('../middleware/auth');

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

const ML_SERVICE = process.env.ML_SERVICE_URL || 'http://localhost:8000/ml';

async function extractTextFromFile(file) {
  const mimetype = file.mimetype || '';
  if (mimetype === 'text/plain' || (file.originalname || '').toLowerCase().endsWith('.txt')) {
    return file.buffer.toString('utf8');
  }
  if (mimetype === 'application/pdf' || (file.originalname || '').toLowerCase().endsWith('.pdf')) {
    try {
      const data = await pdf(file.buffer);
      return data.text || '';
    } catch (e) {
      throw new Error('Failed to parse PDF');
    }
  }
  // unsupported file type (doc/docx etc.)
  throw new Error('Unsupported file type. Please paste JD text or upload a .txt/.pdf');
}

router.post('/upload', upload.single('file'), authenticate, async (req, res) => {
  try {
    const rawText = req.body.rawText || '';
    let text = rawText && rawText.trim() ? rawText.trim() : null;

    if (!text && req.file) {
      text = await extractTextFromFile(req.file);
    }

    if (!text) return res.status(400).json({ error: 'No JD text provided' });

    // call ML service to parse
    let parsed = null;
    try {
      const mlRes = await axios.post(`${ML_SERVICE}/parse-jd`, { text }, { timeout: 20_000 });
      parsed = mlRes.data && mlRes.data.payload ? mlRes.data.payload : mlRes.data;
    } catch (err) {
      console.warn('ML service call failed', err?.message || err);
      // proceed without parsed data
    }

    const jd = new JD({ title: req.body.title || '', rawText: text, parsed, confidence: parsed?.confidence || null, uploader: req.user ? req.user._id : null });
    await jd.save();

    res.json({ ok: true, jdId: jd._id, jd });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Upload failed' });
  }
});

// list jds for recruiter
router.get('/', authenticate, async (req, res) => {
  try {
    const items = await JD.find({ uploader: req.user._id }).sort({ createdAt: -1 });
    res.json({ ok: true, items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to list JDs' });
  }
});

// get single JD
router.get('/:id', authenticate, async (req, res) => {
  try {
    const jd = await JD.findById(req.params.id);
    if (!jd) return res.status(404).json({ error: 'JD not found' });
    res.json({ ok: true, jd });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch JD' });
  }
});

module.exports = router;
