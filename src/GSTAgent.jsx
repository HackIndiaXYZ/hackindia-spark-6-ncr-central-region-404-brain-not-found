import { useState } from "react";

export default function GSTAgent() {
  const [query, setQuery] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function runAgent() {
    if (!query.trim()) return;

    setLoading(true);
    setOutput("");

    try {
      const res = await fetch("https://" + window.location.host + "/api/gst", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ query })
      });

      const data = await res.json();
      setOutput(data.reply);
    } catch (err) {
      setOutput("❌ Connection error");
    }

    setLoading(false);
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>🧾 GST Saathi</h2>

      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask GST question..."
        style={{ width: "100%", height: 120 }}
      />

      <br /><br />

      <button onClick={runAgent} disabled={loading}>
        {loading ? "Loading..." : "Ask GST Saathi"}
      </button>

      <div style={{ marginTop: 20 }}>
        <b>Response:</b>
        <p>{output}</p>
      </div>
    </div>
  );
}