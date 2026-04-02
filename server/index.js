import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();

app.use(cors());
app.use(express.json());

const SYSTEM_PROMPT = `You are GST Saathi, an expert Indian GST assistant. Give clear, structured answers with headings.`;

// 🔥 MAIN ROUTE
app.post("/api/gst", async (req, res) => {
  try {
    console.log("🔥 Incoming request:", req.body);

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": "YOUR_REAL_API_KEY", // 🔴 PUT YOUR KEY HERE
        "anthropic-version": "2023-06-01",
        "content-type": "application/json"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 500,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: "user",
            content: req.body.query
          }
        ]
      })
    });

    const data = await response.json();

    console.log("🔥 API response:", data);

    res.json({
      reply: data?.content?.[0]?.text || "⚠️ No response from AI"
    });

  } catch (err) {
    console.error("❌ ERROR:", err);
    res.status(500).json({
      error: "API error",
      details: err.message
    });
  }
});

app.listen(3000, () => {
  console.log("🚀 Server running on port 3000");
});