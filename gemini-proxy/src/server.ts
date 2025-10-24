import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error('GEMINI_API_KEY environment variable is not set.');
  process.exit(1);
}

app.post('/api/gemini', async (req, res) => {
  try {
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
      req.body,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          key: GEMINI_API_KEY
        }
      }
    );
    res.json(response.data);
  } catch (err: any) {
    res.status(500).json({ error: err.toString() });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Gemini proxy server running on port ${port}`));
