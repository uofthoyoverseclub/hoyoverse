import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.get('/api/discord-events', async (req, res) => {
  try {
    const response = await fetch(
      `https://discord.com/api/v10/guilds/${process.env.DISCORD_GUILD_ID}/scheduled-events`,
      {
        headers: {
          Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      return res.status(response.status).json({
        error: 'Discord API error',
      });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch Discord events' });
  }
});

app.listen(3000, () => {
  console.log('API running on http://localhost:3000');
});
