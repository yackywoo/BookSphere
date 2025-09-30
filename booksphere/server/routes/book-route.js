const express = require('express');
const { getOrFetchBookPdfUrl } = require('../lib/book-logic');
const router = express.Router();

router.get('/', async (req, res) => {
  const { title } = req.query;
  if (!title) {
    return res.status(400).json({ error: "A 'title' parameter is required." });
  }
  const pdfUrl = await getOrFetchBookPdfUrl(title);
  if (pdfUrl) {
    return res.json({ pdf_url: pdfUrl });
  } else {
    return res.status(404).json({ error: "Book not found or no public domain PDF available." });
  }
});

module.exports = router;