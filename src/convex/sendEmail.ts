"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY;

export const sendProjectRequest = action({
  args: {
    fullName: v.string(),
    email: v.string(),
    company: v.optional(v.string()),
    services: v.string(),
    budget: v.optional(v.string()),
    message: v.string(),
  },
  handler: async (_ctx, args) => {
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY environment variable is not set");
    }
    const resend = new Resend(RESEND_API_KEY);

    const servicesList = args.services
      .split(", ")
      .map((s) => `• ${s}`)
      .join("<br>");

    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0B0A09; padding: 40px; color: #F3EFE6;">
        <div style="max-width: 560px; margin: 0 auto;">
          <h1 style="font-size: 24px; font-weight: 700; letter-spacing: -0.5px; margin: 0 0 8px 0; color: #F3EFE6;">
            HADES <span style="color: #C6A66B; font-weight: 300;">DIGITAL</span>
          </h1>
          <p style="font-size: 13px; color: #BEB8AC; margin: 0 0 32px 0;">New Project Request</p>

          <div style="background: #151310; border: 1px solid rgba(198,166,107,0.08); border-radius: 12px; padding: 28px; margin-bottom: 24px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 6px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #BEB8AC; width: 120px;">Name</td>
                <td style="padding: 6px 0; font-size: 14px; color: #F3EFE6;">${args.fullName}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #BEB8AC;">Email</td>
                <td style="padding: 6px 0; font-size: 14px; color: #C6A66B;">${args.email}</td>
              </tr>
              ${args.company ? `
              <tr>
                <td style="padding: 6px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #BEB8AC;">Company</td>
                <td style="padding: 6px 0; font-size: 14px; color: #F3EFE6;">${args.company}</td>
              </tr>` : ""}
              <tr>
                <td style="padding: 6px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #BEB8AC;">Services</td>
                <td style="padding: 6px 0; font-size: 14px; color: #F3EFE6;">${servicesList}</td>
              </tr>
              ${args.budget ? `
              <tr>
                <td style="padding: 6px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #BEB8AC;">Budget</td>
                <td style="padding: 6px 0; font-size: 14px; color: #F3EFE6;">${args.budget}</td>
              </tr>` : ""}
            </table>
          </div>

          <div style="background: #151310; border: 1px solid rgba(198,166,107,0.08); border-radius: 12px; padding: 28px; margin-bottom: 24px;">
            <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #BEB8AC; margin: 0 0 12px 0;">Project Details</p>
            <p style="font-size: 14px; line-height: 1.7; color: #D8C49A; margin: 0;">${args.message}</p>
          </div>

          <p style="font-size: 11px; color: #8A8478; text-align: center; margin-top: 32px;">
            Sent from hadesdigital.com contact form
          </p>
        </div>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: "Hades Digital <onboarding@resend.dev>",
      to: "hadesltd.io@gmail.com",
      subject: `New Project Request — ${args.fullName}${args.company ? ` (${args.company})` : ""}`,
      html,
      replyTo: args.email,
    });

    if (error) {
      console.error("Resend error:", JSON.stringify(error));
      throw new Error(error.message || JSON.stringify(error));
    }

    return data;
  },
});
