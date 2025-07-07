// controllers/competitorAi.controller.js
const axios = require("axios");

/**
 * POST /ai/comparison
 * Body:
 *   {
 *     comparison: {               // the object you already build in createComparison
 *       userSiteUrl: "https://…",
 *       userScores: { mobile:{…}, desktop:{…} },
 *       competitors: [
 *         { url:"https://…", label:"", scores:{ mobile:{…}, desktop:{…} } },
 *         …
 *       ]
 *     },
 *     format: "markdown" | "json"  // optional, default = markdown for direct rendering
 *   }
 */
const createAICompetitorAnalysis = async (req, res) => {
  const { comparison, format = "markdown" } = req.body ?? {};
  if (!comparison)
    return res.status(400).json({ error: "No comparison data supplied" });

  // ---------- 1.  Prepare a compact payload for the LLM ----------
  // We only need the numeric scores; keep it small so we stay under token limits.
  const toTableRow = (label, { mobile, desktop }) =>
    [
      label,
      mobile.performance,
      mobile.accessibility,
      mobile.seo,
      mobile.bestPractices,
      desktop.performance,
      desktop.accessibility,
      desktop.seo,
      desktop.bestPractices,
    ].join(" | ");

  const header =
    "Site | M‑Perf | M‑Acc | M‑SEO | M‑BP | D‑Perf | D‑Acc | D‑SEO | D‑BP";

  const userRow = toTableRow(comparison.userSiteUrl, comparison.userScores);
  const compRows = comparison.competitors
    .filter((c) => c.scores && !c.error)
    .map((c) => toTableRow(c.label || c.url, c.scores))
    .join("\n");

  const scoresTable = [header, userRow, compRows].join("\n");

  // ---------- 2.  Build the prompt ----------
  const messages = [
    {
      role: "system",
      content: [
        "You are an expert Lighthouse/PageSpeed auditor.",
        "Analyse how the *user’s site* (first row in the table below) compares against each competitor.",
        "Deliver:",
        "1. Executive summary (≤ 4 sentences).",
        "2. Findings grouped by **Performance · Accessibility · SEO · Best Practices**.",
        "3. Quick table highlighting where the user leads or lags (✓ = leads by ≥5 points, ✗ = lags by ≥5 points).",
        "4. Priority‑ranked, actionable recommendations (start with low‑effort / high‑impact wins).",
        "5. Any anomalies (e.g. mobile ≫ desktop).",
        `Return the answer in **${format.toUpperCase()}**.`,
      ].join("\n"),
    },
    {
      role: "user",
      content: [
        "Here are the scores (0‑100). The first row is the user’s site.",
        "",
        "```",
        scoresTable,
        "```",
      ].join("\n"),
    },
  ];

  // ---------- 3.  Call DeepSeek via OpenRouter ----------
  try {
    const { data } = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-chat:free",
        messages,
        temperature: 0.25,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const analysis = data.choices?.[0]?.message?.content ?? "";
    res.json({ analysis, format });
  } catch (err) {
    console.error("DeepSeek API error:", err.response?.data || err.message);
    res
      .status(502)
      .json({ error: "AI competitor analysis failed", details: err.message });
  }
};

module.exports = { createAICompetitorAnalysis };
