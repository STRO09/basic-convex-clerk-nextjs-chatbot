import { query } from "../_generated/server";
import { v } from "convex/values";

// Return the last 100 tasks in a given task list.
export const getUserMessages = query({
  handler: async (ctx, args) => {
    return await ctx.db
      .query("messages")
      .withIndex("by_timestamp")
      .order("asc")
      .collect();

  },
});