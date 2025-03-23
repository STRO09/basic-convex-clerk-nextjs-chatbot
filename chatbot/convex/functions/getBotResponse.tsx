import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const getBotResponse = mutation({
  args: { userMessage: v.string() },
  handler: async (ctx, args) => {
    const apiKey = process.env.GEMINI_API_KEY;
    const apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateText";

    if (!apiKey) throw new Error("Missing Gemini API key");

    // Call Gemini API
    const response = await fetch(`${apiUrl}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: { text: args.userMessage },
      }),
    });

    const data = await response.json();
    const botMessage = data?.candidates?.[0]?.output || "I couldn't understand that.";

    // ✅ Directly store the response in the database (since this is a mutation)
    const message = await ctx.db.insert("messages", {
      text: botMessage,
      role: "bot",
      timestamp: Date.now(),
    });

    return message;
  },
});
