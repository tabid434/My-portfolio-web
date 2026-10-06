"use client";

import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { flushSync } from "react-dom";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ThemeProvider, useTheme } from "next-themes";
import { AnimatePresence, MotionConfig, animate, motion, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowUpRight, BriefcaseBusiness, Download, GitFork, Menu, Moon, Sun, X } from "lucide-react";
import { contact } from "@/lib/portfolio";

const Architecture = dynamic(() => import("./architecture"), { ssr: false });
const navigation = ["Home", "About", "Experience", "Projects", "Education", "Contact"];
const ease = [0.16, 1, 0.3, 1] as const;

export function Providers({ children }: { children: ReactNode }) {
  return <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem disableTransitionOnChange storageKey="talha-theme"><MotionConfig reducedMotion="user">
    <div className="ambient" aria-hidden="true"><i /><i /><i /></div>
    <div className="grain" aria-hidden="true" />
    {children}
  </MotionConfig></ThemeProvider>;
}

export function HeroScene() {
  return <div className="hero-scene"><div className="architecture-fallback" aria-hidden="true"><i /><i /><i /></div><Architecture /></div>;
}

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 44, filter: "blur(6px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 1, delay, ease }}>{children}</motion.div>;
}

export function SplitHeading({ lines, className, as = "h2" }: { lines: ReactNode[]; className?: string; as?: "h1" | "h2" }) {
  const reduced = useReducedMotion();
  const Tag = as === "h1" ? motion.h1 : motion.h2;
  return <Tag className={className} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.35 }}>
    {lines.map((line, index) => <span className="line-mask" key={index}><motion.span className="line-inner" variants={{ hidden: { y: reduced ? "0%" : "108%", rotate: reduced ? 0 : 2.5 }, show: { y: "0%", rotate: 0, transition: { duration: 1.1, ease, delay: index * 0.1 } } }}>{line}</motion.span></span>)}
  </Tag>;
}

const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+";

export function Scramble({ text, className = "" }: { text: string; className?: string }) {
  const [output, setOutput] = useState(text);
  const host = useRef<HTMLSpanElement>(null);
  const frame = useRef(0);
  const reduced = useReducedMotion();
  const run = () => {
    if (reduced) return;
    cancelAnimationFrame(frame.current);
    let tick = 0;
    const total = 24;
    const step = () => {
      tick++;
      const progress = tick / total;
      setOutput(text.split("").map((char, index) => char === " " || char === "/" || index / text.length < progress ? char : glyphs[Math.floor(Math.random() * glyphs.length)]).join(""));
      if (tick < total) frame.current = requestAnimationFrame(step);
    };
    step();
  };
  useEffect(() => {
    if (reduced || !host.current) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { run(); observer.disconnect(); } }, { threshold: 0.8 });
    observer.observe(host.current);
    return () => { observer.disconnect(); cancelAnimationFrame(frame.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, reduced]);
  return <span ref={host} className={`scramble ${className}`} onPointerEnter={run}><span className="sr-only">{text}</span><span aria-hidden="true">{output}</span></span>;
}

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const host = useRef<HTMLSpanElement>(null);
  const inView = useInView(host, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!inView || reduced || !host.current) return;
    const node = host.current;
    const controls = animate(0, to, { duration: 2, ease: [0.22, 1, 0.36, 1], onUpdate: (value) => { node.textContent = `${Math.round(value)}${suffix}`; } });
    return () => controls.stop();
  }, [inView, reduced, to, suffix]);
  return <span ref={host}>{to}{suffix}</span>;
}

export function useMagnetic<T extends HTMLElement>(strength = 0.28) {
  const reduced = useReducedMotion();
  const horizontal = useMotionValue(0);
  const vertical = useMotionValue(0);
  const x = useSpring(horizontal, { stiffness: 220, damping: 16, mass: 0.5 });
  const y = useSpring(vertical, { stiffness: 220, damping: 16, mass: 0.5 });
  return {
    style: { x, y },
    onPointerMove: (event: ReactPointerEvent<T>) => {
      const bounds = event.currentTarget.getBoundingClientRect();
      event.currentTarget.style.setProperty("--x", `${event.clientX - bounds.left}px`);
      event.currentTarget.style.setProperty("--y", `${event.clientY - bounds.top}px`);
      if (reduced || event.pointerType !== "mouse") return;
      horizontal.set((event.clientX - bounds.left - bounds.width / 2) * strength);
      vertical.set((event.clientY - bounds.top - bounds.height / 2) * strength);
    },
    onPointerLeave: () => { horizontal.set(0); vertical.set(0); },
  };
}

export function MagneticLink({ href, children, className = "", download }: { href: string; children: ReactNode; className?: string; download?: boolean }) {
  const magnetic = useMagnetic<HTMLAnchorElement>();
  return <motion.a href={href} download={download} className={className} {...magnetic}>{children}</motion.a>;
}

type CursorMode = "idle" | "hover" | "stick" | "label" | "text";
const stickTargets = ".icon-button, .desktop-nav a, .nav-resume, .button, .wordmark, [data-stick]";

function Cursor() {
  const reduced = useReducedMotion();
  const [label, setLabel] = useState("");
  const [mode, setMode] = useState<CursorMode>("idle");
  const [shown, setShown] = useState(false);
  const [pressed, setPressed] = useState(false);
  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);
  const targetX = useMotionValue(-100);
  const targetY = useMotionValue(-100);
  const targetWidth = useMotionValue(30);
  const targetHeight = useMotionValue(30);
  const ringX = useSpring(targetX, { stiffness: 420, damping: 34, mass: 0.55 });
  const ringY = useSpring(targetY, { stiffness: 420, damping: 34, mass: 0.55 });
  const ringWidth = useSpring(targetWidth, { stiffness: 340, damping: 28 });
  const ringHeight = useSpring(targetHeight, { stiffness: 340, damping: 28 });
  const pressScale = useSpring(1, { stiffness: 500, damping: 30 });
  const auraX = useSpring(pointerX, { stiffness: 80, damping: 16, mass: 0.7 });
  const auraY = useSpring(pointerY, { stiffness: 80, damping: 16, mass: 0.7 });
  const left = useTransform(() => ringX.get() - ringWidth.get() / 2);
  const top = useTransform(() => ringY.get() - ringHeight.get() / 2);
  const auraLeft = useTransform(() => auraX.get() - 52);
  const auraTop = useTransform(() => auraY.get() - 52);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  useEffect(() => {
    if (reduced || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const root = document.documentElement;
    root.classList.add("has-cursor");
    let last = { x: -100, y: -100 };
    const update = (x: number, y: number, target: Element | null) => {
      const spotlight = target?.closest<HTMLElement>("[data-spotlight], .spotlight");
      if (spotlight) {
        const bounds = spotlight.getBoundingClientRect();
        spotlight.style.setProperty("--mx", `${x - bounds.left}px`);
        spotlight.style.setProperty("--my", `${y - bounds.top}px`);
      }
      const element = target?.closest<HTMLElement>("[data-cursor], a, button, summary, input, textarea, select, [role='tab']");
      if (element?.dataset.cursor) {
        setMode("label"); setLabel(element.dataset.cursor);
        targetX.set(x); targetY.set(y); targetWidth.set(72); targetHeight.set(72);
      } else if (element?.matches("input, textarea, select")) {
        setMode("text"); setLabel("");
        targetX.set(x); targetY.set(y); targetWidth.set(8); targetHeight.set(8);
      } else if (element?.matches(stickTargets)) {
        const bounds = element.getBoundingClientRect();
        const centerX = bounds.left + bounds.width / 2;
        const centerY = bounds.top + bounds.height / 2;
        setMode("stick"); setLabel("");
        targetX.set(centerX + (x - centerX) * 0.12); targetY.set(centerY + (y - centerY) * 0.12);
        targetWidth.set(bounds.width + 10); targetHeight.set(Math.max(bounds.height + 6, 30));
      } else if (element) {
        setMode("hover"); setLabel("");
        targetX.set(x); targetY.set(y); targetWidth.set(44); targetHeight.set(44);
      } else {
        setMode("idle"); setLabel("");
        targetX.set(x); targetY.set(y); targetWidth.set(30); targetHeight.set(30);
      }
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") { setShown(false); return; }
      last = { x: event.clientX, y: event.clientY };
      pointerX.set(event.clientX); pointerY.set(event.clientY); setShown(true);
      update(event.clientX, event.clientY, event.target as Element);
    };
    const scroll = () => { if (last.x > 0) update(last.x, last.y, document.elementFromPoint(last.x, last.y)); };
    const leave = () => setShown(false);
    const timers: number[] = [];
    const down = (event: PointerEvent) => {
      setPressed(true); pressScale.set(0.82);
      if (event.pointerType !== "mouse") return;
      const id = Date.now() + Math.random();
      setRipples((items) => [...items.slice(-3), { id, x: event.clientX, y: event.clientY }]);
      timers.push(window.setTimeout(() => setRipples((items) => items.filter((item) => item.id !== id)), 640));
    };
    const up = () => { setPressed(false); pressScale.set(1); };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    root.addEventListener("pointerleave", leave);
    return () => {
      root.classList.remove("has-cursor");
      timers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener("pointermove", move); window.removeEventListener("scroll", scroll);
      window.removeEventListener("pointerdown", down); window.removeEventListener("pointerup", up);
      root.removeEventListener("pointerleave", leave);
    };
  }, [pointerX, pointerY, targetX, targetY, targetWidth, targetHeight, pressScale, reduced]);
  const auraOn = shown && (mode === "idle" || mode === "hover");
  return <>
    <motion.div aria-hidden="true" className="cursor-aura" style={{ x: auraLeft, y: auraTop, opacity: auraOn ? 1 : 0 }} />
    {ripples.map((ripple) => <span key={ripple.id} className="cursor-ripple" style={{ left: ripple.x, top: ripple.y }} />)}
    <motion.div aria-hidden="true" className={`cursor-frame is-${mode} ${pressed ? "is-pressed" : ""}`} style={{ x: left, y: top, scale: pressScale, width: ringWidth, height: ringHeight, opacity: shown && mode !== "text" ? 1 : 0 }}>
      <i className="cursor-brackets" />
      <div className={`custom-cursor is-${mode}`}>
        <i className="cursor-sweep" />
        <span>{label}</span>
      </div>
    </motion.div>
    <motion.div aria-hidden="true" className={`cursor-dot is-${mode}`} style={{ x: pointerX, y: pointerY, opacity: shown && (mode === "idle" || mode === "hover") ? 1 : 0 }} />
  </>;
}

type TransitionDocument = Document & { startViewTransition?: (update: () => void) => { ready: Promise<void> } };

export function Header() {
  const { resolvedTheme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [hovered, setHovered] = useState<string | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 30, restDelta: 0.001 });
  const themeMagnet = useMagnetic<HTMLButtonElement>(0.35);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: "-15% 0px -65% 0px" });
    document.querySelectorAll("main section[id]").forEach((section) => observer.observe(section));
    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, []);
  useEffect(() => {
    if (open) { dialog.current?.showModal(); document.body.style.overflow = "hidden"; }
    else { dialog.current?.close(); document.body.style.overflow = ""; }
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  function close() { setOpen(false); trigger.current?.focus(); }
  function toggleTheme(event: ReactMouseEvent<HTMLButtonElement>) {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    const transitionDocument = document as TransitionDocument;
    const apply = () => { document.documentElement.setAttribute("data-theme", next); document.documentElement.style.colorScheme = next; flushSync(() => setTheme(next)); };
    if (!transitionDocument.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) { apply(); return; }
    const x = event.clientX || window.innerWidth - 60;
    const y = event.clientY || 40;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    transitionDocument.startViewTransition(apply).ready.then(() => {
      document.documentElement.animate({ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] }, { duration: 750, easing: "cubic-bezier(0.65, 0, 0.35, 1)", pseudoElement: "::view-transition-new(root)" });
    }).catch(() => {});
  }
  const lit = hovered ?? active;
  return <>
    <motion.div className="scroll-progress" style={{ scaleX: progress }} aria-hidden="true" />
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <nav className="navigation" aria-label="Main navigation">
        <Link href="/#home" className="wordmark" aria-label="Talha Abid home">ABID<span>.</span></Link>
        <div className="desktop-nav" onPointerLeave={() => setHovered(null)}>{navigation.map((item) => {
          const id = item.toLowerCase();
          return <Link href={`/#${id}`} key={item} className={active === id ? "active" : ""} onPointerEnter={() => setHovered(id)}>
            {lit === id && <motion.span layoutId="nav-pill" className="nav-pill" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
            <span className="nav-text">{item}</span>
          </Link>;
        })}</div>
        <div className="nav-utilities">
          <a href={contact.github} className="icon-button nav-social" aria-label="GitHub" title="GitHub" target="_blank" rel="noreferrer"><GitFork size={17} /></a>
          <a href={contact.linkedin} className="icon-button nav-social" aria-label="LinkedIn" title="LinkedIn" target="_blank" rel="noreferrer"><BriefcaseBusiness size={17} /></a>
          <motion.button className="icon-button theme-toggle" aria-label="Toggle color theme" title="Toggle color theme" onClick={toggleTheme} {...themeMagnet}><Sun size={18} className="sun-icon" /><Moon size={18} className="moon-icon" /></motion.button>
          <a className="nav-resume" href={contact.resume} download><span>Resume</span> <Download size={14} /></a>
          <button ref={trigger} className="icon-button mobile-trigger" aria-label="Open navigation" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(true)}><Menu size={22} /></button>
        </div>
      </nav>
    </header>
    <dialog ref={dialog} id="mobile-navigation" className="mobile-navigation" onCancel={close} onClose={close} aria-label="Navigation">
      <div className="mobile-nav-top"><span className="wordmark">ABID<span>.</span></span><button className="icon-button" aria-label="Close navigation" onClick={close}><X /></button></div>
      <AnimatePresence>{open && <motion.nav initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } } }} aria-label="Mobile navigation">{navigation.map((item, index) => <motion.div key={item} className="mobile-link-mask" variants={{ hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}><Link onClick={close} href={`/#${item.toLowerCase()}`}><span className="mono">0{index + 1}</span>{item}<ArrowUpRight size={24} /></Link></motion.div>)}</motion.nav>}</AnimatePresence>
      <a href={contact.resume} download className="button outline">Download resume <Download size={16} /></a>
      <p className="mono">Lahore / Gujranwala, Pakistan</p>
    </dialog>
    <Cursor />
  </>;
}
