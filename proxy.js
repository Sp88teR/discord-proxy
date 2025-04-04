// api/proxy.js
export default async function handler(req, res) { const { method, url, headers, body } = req;
const targetUrl = https://discord.com${url};
try { const discordRes = await fetch(targetUrl, { method, headers: { ...headers, host: "discord.com", }, body: method !== "GET" && method !== "HEAD" ? body : undefined, });
const responseBody = await discordRes.arrayBuffer(); res.status(discordRes.status); for (const [key, value] of discordRes.headers.entries()) { res.setHeader(key, value); } res.send(Buffer.from(responseBody)); 
} catch (err) { res.status(500).json({ error: "Proxy error", detail: err.message }); } }