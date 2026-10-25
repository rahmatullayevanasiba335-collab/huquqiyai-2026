const express = require('express');
const path = require('path');

const app = express();
const API_URL = 'https://huquqiy-ai-teal.vercel.app/api/chat';

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/chat', async (req, res) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
      signal: AbortSignal.timeout(20000)
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('API xatosi:', error.message);
    res.status(502).json({
      error: 'API serveriga ulanib bo‘lmadi.'
    });
  }
});

if (require.main === module) {
  app.listen(3000, '127.0.0.1', () => {
    console.log('Sayt: http://127.0.0.1:3000');
  });
}

module.exports = app;
