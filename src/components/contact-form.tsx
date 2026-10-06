"use client";

import { useRef, useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Check, LoaderCircle } from "lucide-react";
import { contact } from "@/lib/portfolio";
import { useMagnetic } from "./site-shell";

export default function ContactForm() {
  const magnetic = useMagnetic<HTMLButtonElement>(0.22);
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  const pending = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current) return;
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    pending.current = true;
    setState("sending");
    setFeedback("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values), signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to send your message.");
      setState("success");
      setFeedback(result.message);
      form.reset();
    } catch (error) {
      setState("error");
      setFeedback(error instanceof Error && error.name !== "TimeoutError" ? error.message : "Delivery could not be confirmed. Please email directly before resubmitting.");
    } finally {
      pending.current = false;
    }
  }

  return (
    <form onSubmit={submit} className="contact-form spotlight" aria-busy={state === "sending"}>
      <fieldset disabled={state === "sending"}>
        <div className="form-pair">
          <label>Your name<input name="name" autoComplete="name" required minLength={2} maxLength={100} placeholder="Alex Morgan" /></label>
          <label>Email address<input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="alex@company.com" /></label>
        </div>
        <label>What are you working on?<input name="subject" required minLength={3} maxLength={160} placeholder="A product, a collaboration, an idea..." /></label>
        <label>A little more detail<textarea name="message" required minLength={20} maxLength={5000} rows={4} placeholder="Tell me about the product and what you have in mind." /></label>
        <div className="honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
        <motion.button className="button solid" type="submit" disabled={state === "sending"} {...magnetic}>
          {state === "sending" ? <>Sending <LoaderCircle size={17} className="spin" /></> : state === "success" ? <>Send another message <Check size={17} /></> : <>Send message <ArrowUpRight size={17} /></>}
        </motion.button>
      </fieldset>
      <p className={`form-feedback ${state}`} role={state === "error" ? "alert" : "status"}>{feedback}</p>
      {state === "error" && <a className="inline-link" href={`mailto:${contact.email}`}>Email Talha directly <ArrowUpRight size={14} /></a>}
    </form>
  );
}