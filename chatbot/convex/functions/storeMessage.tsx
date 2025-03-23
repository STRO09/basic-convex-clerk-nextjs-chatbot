
import { mutation } from "../_generated/server";
import { v } from "convex/values";

// Create a new task with the given text
export const storeMessage= mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.insert("messages", { text: args.text, role: "user", timestamp: Date.now()});
   
  },
});