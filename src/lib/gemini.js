import "server-only";

/** No Gemini SDK required. Keys remain on the Next.js server. */
export async function generateGemini(
  prompt,
  { image = false, maxOutputTokens = 4600 } = {},
) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is not configured.");
  const model = image
    ? process.env.GEMINI_IMAGE_MODEL || "3.5-flash-lite-image"
    : process.env.GEMINI_TEXT_MODEL || "3.5-flash-lite";
  if (!/^[a-zA-Z0-9_.-]+$/.test(model))
    throw new Error("Invalid Gemini model name");
  const body = {
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: image
      ? { responseModalities: ["IMAGE"], imageConfig: { aspectRatio: "16:9" } }
      : {
          responseMimeType: "application/json",
          temperature: 0.5,
          maxOutputTokens,
        },
  };
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), image ? 55000 : 48000);
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify(body),
        signal: controller.signal,
        cache: "no-store",
      },
    );
    const payload = await response.json().catch(() => ({}));
    if (!response.ok)
      throw new Error(
        `Gemini ${response.status}: ${JSON.stringify(payload.error?.message || "Request failed").slice(0, 220)}`,
      );
    const parts = (payload.candidates || []).flatMap(
      (x) => x.content?.parts || [],
    );
    if (image) {
      const part = parts.find(
        (p) =>
          p.inlineData?.data && /^image\//.test(p.inlineData.mimeType || ""),
      );
      if (!part) throw new Error("Gemini returned no image.");
      return {
        mimeType: part.inlineData.mimeType,
        base64: part.inlineData.data,
      };
    }
    const txt = parts
      .map((p) => p.text || "")
      .join("\n")
      .trim();
    if (!txt) throw new Error("Gemini returned no text.");
    const sanitized = txt
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/, "");
    try {
      return JSON.parse(sanitized);
    } catch {
      throw new Error("Gemini did not return valid JSON; please retry.");
    }
  } finally {
    clearTimeout(timer);
  }
}
