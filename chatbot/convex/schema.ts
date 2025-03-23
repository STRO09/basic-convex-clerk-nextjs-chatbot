import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// The schema is entirely optional.
// You can delete this file (schema.ts) and the
// app will continue to work.
// The schema provides more precise TypeScript types.
export default defineSchema({
  numbers: defineTable({
    value: v.number(),
  }),
  tasks: defineTable({  // ✅ Added tasks table
    text: v.string(),
    isCompleted: v.boolean(),
  }),
  messages: defineTable({
    role: v.union(v.literal("user"), v.literal("bot")), // Defines sender type
    text: v.string(), // Message content
    timestamp: v.number(), // UNIX timestamp for sorting
  }).index("by_timestamp", ["timestamp"]), // Indexing for efficient retrieval
});
