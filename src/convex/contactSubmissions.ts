import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Save a contact form submission
export const submit = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    company: v.optional(v.string()),
    services: v.string(),
    budget: v.optional(v.string()),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("contactSubmissions", {
      ...args,
      status: "new",
      createdAt: Date.now(),
    });
    return id;
  },
});

// Get all submissions (admin only — called from frontend after auth check)
export const list = query({
  handler: async (ctx) => {
    const submissions = await ctx.db
      .query("contactSubmissions")
      .order("desc")
      .collect();
    return submissions;
  },
});

// Get unread count
export const unreadCount = query({
  handler: async (ctx) => {
    const all = await ctx.db.query("contactSubmissions").collect();
    return all.filter((s) => s.status === "new").length;
  },
});

// Mark a submission as read
export const markAsRead = mutation({
  args: { id: v.id("contactSubmissions") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: "read" });
  },
});

// Archive a submission
export const archive = mutation({
  args: { id: v.id("contactSubmissions") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: "archived" });
  },
});

// Delete a submission
export const remove = mutation({
  args: { id: v.id("contactSubmissions") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
