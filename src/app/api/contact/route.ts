import { Resend } from "resend";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { z } from "zod";
import { contact } from "@/lib/portfolio";

export const runtime = "nodejs";

const submission = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.email().max(254),
  subject: z.string().trim().min(3).max(160).refine((value) => !/[\r\n]/.test(value)),
  message: z.string().trim().min(20).max(5000),
  website: z.string().max(0).optional(),
});

const limiter = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Ratelimit({ redis: Redis.fromEnv(), limiter: Ratelimit.slidingWindow(5, "10 m"), prefix: "portfolio:contact" })
  : null;

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const allowedOrigin = new URL(process.env.SITE_URL || request.url).origin;
  if (origin !== allowedOrigin) {
    return Response.json({ error: "This request could not be verified. Please reload the page." }, { status: 403 });
  }
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return Response.json({ error: "Expected a JSON submission." }, { status: 415 });
  }
  if (Number(request.headers.get("content-length") || 0) > 24000) {
    return Response.json({ error: "Your message is too long." }, { status: 413 });
  }

  let body: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) throw new Error("Missing body");
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 24000) {
        await reader.cancel();
        return Response.json({ error: "Your message is too long." }, { status: 413 });
      }
      chunks.push(value);
    }
    body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return Response.json({ error: "The submission could not be read." }, { status: 400 });
  }
  const parsed = submission.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Check your name, email, subject, and message (20-5,000 characters)." }, { status: 422 });
  }
  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_FROM_EMAIL || (process.env.NODE_ENV === "production" && !limiter)) {
    return Response.json({ error: "Email delivery is temporarily unavailable. Please email Talha directly." }, { status: 503 });
  }

  try {
    if (limiter) {
      const { success, reset } = await limiter.limit("inbox");
      if (!success) {
        return Response.json({ error: "Too many enquiries right now. Please try again in a few minutes." }, {
          status: 429, headers: { "Retry-After": String(Math.max(1, Math.ceil((reset - Date.now()) / 1000))) },
        });
      }
    }
    const { name, email, subject, message } = parsed.data;
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL,
      to: contact.email,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
    });
    if (error || !data?.id) {
      return Response.json({ error: "The email service could not accept your message. Please try again or email directly." }, { status: 502 });
    }
    return Response.json({ message: "Your message has been accepted for email delivery. Thank you for reaching out." });
  } catch {
    return Response.json({ error: "Delivery could not be confirmed. Please email Talha directly." }, { status: 503 });
  }
}