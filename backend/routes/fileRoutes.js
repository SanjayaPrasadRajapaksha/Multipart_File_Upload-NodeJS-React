const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('../models');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { filename, path: filePath } = req.file;
    const file = await db.files.create({ name: filename, path: filePath });
    res.status(201).json(file);
  } catch (error) {
    res.status(500).json({ error: 'File upload failed' });
  }
});

router.get('/files', async (req, res) => {
  try {
    const files = await db.files.findAll();
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch files' });
  }
});

module.exports = router;
