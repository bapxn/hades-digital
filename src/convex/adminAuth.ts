"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export const login = action({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (_ctx, args) => {
    if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
      throw new Error("Admin credentials not configured");
    }

    if (args.email === ADMIN_EMAIL && args.password === ADMIN_PASSWORD) {
      return { success: true, token: btoa(`${args.email}:${Date.now()}`) };
    }

    throw new Error("Invalid email or password");
  },
});
