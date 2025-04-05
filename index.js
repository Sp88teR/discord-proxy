import express from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/webhooks", async (req, res) => {
  const targetUrl = `https://discord.com${req.originalUrl}`;

  try {
    const discordRes = await fetch(targetUrl, {
      method: req.method,
      headers: {
        ...req.headers,
        host: "discord.com",
      },
      body: req.method !== "GET" && req.method !== "HEAD" ? JSON.stringify(req.body) : undefined,
    });

    const data = await discordRes.text();
    res.status(discordRes.status).send(data);
  } catch (err) {
    res.status(500).json({ error: "proxy failed", details: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Proxy running on port", PORT);
});