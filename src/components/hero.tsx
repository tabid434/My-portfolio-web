"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { contact } from "@/lib/portfolio";
import { HeroScene, MagneticLink } from "./site-shell";

const ease = [0.16, 1, 0.3, 1] as const;
const lines = ["TALHA", "ABID"];
const roles = ["Full-Stack Developer", "Mobile App Developer", "Software Engineer"];

export default function Hero() {
  const reduced = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), document.documentElement.dataset.intro === "on" ? 1500 : 80);
    return () => window.clearTimeout(timer);
  }, []);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end start"] });
  const identityY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const identityOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.1]);
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const state = ready || reduced ? "show" : "hidden";
  const rise = (delay: number) => ({ initial: reduced ? false : { opacity: 0, y: 24 }, animate: ready || reduced ? { opacity: 1, y: 0 } : undefined, transition: { duration: 0.9, delay, ease } });
  let letterIndex = 0;
  return <>
  <div className="intro" aria-hidden="true"><div className="intro-word">{"ABID.".split("").map((char, index) => <span key={index} style={{ animationDelay: `${index * 0.06}s` }}>{char}</span>)}</div><div className="intro-meter"><i /></div><span className="intro-count mono" /></div>
  <section ref={section} className="hero" id="home" data-spotlight>
    <div className="hero-glow" aria-hidden="true" />
    <motion.div className="hero-scene-wrap" style={reduced ? undefined : { y: sceneY, scale: sceneScale }}><HeroScene /></motion.div>
    <motion.div className="hero-top mono" {...rise(0.1)}><span className="availability"><i className="status-dot" /> Independent thinking. Connected systems.</span><span className="hero-location">Based in Pakistan / Working beyond borders</span></motion.div>
    <motion.div className="hero-identity" style={reduced ? undefined : { y: identityY, opacity: identityOpacity }}>
      <p className="hero-role">{roles.map((role, index) => <motion.span key={role} className="role-chip" {...rise(0.15 + index * 0.08)}>{role}</motion.span>)}</p>
      <h1 aria-label="Talha Abid">{lines.map((line, lineIndex) => <span className={`hero-line line-${lineIndex}`} key={line} aria-hidden="true">
        {line.split("").map((char, charIndex) => {
          const order = letterIndex++;
          return <motion.span key={charIndex} className="char-wrap" initial="hidden" animate={state} variants={{ hidden: { y: "115%", rotate: 8 }, show: { y: "0%", rotate: 0, transition: { duration: 1.15, ease, delay: 0.1 + order * 0.055 } } }}>
            <span className="char" style={{ "--i": charIndex, "--n": line.length } as CSSProperties}>{char}</span>
          </motion.span>;
        })}
        {lineIndex === 1 && <motion.span className="identity-period" initial="hidden" animate={state} variants={{ hidden: { scale: 0, opacity: 0 }, show: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 380, damping: 14, delay: 0.75 } } }}>.</motion.span>}
      </span>)}</h1>
    </motion.div>
    <div className="scene-coordinates mono" aria-hidden="true"><span>SYS.01 / CONNECTED ARCHITECTURE</span><span>INTERFACE / LOGIC / CONNECTION</span></div>
    <div className="hero-bottom">
      <motion.div className="hero-positioning" {...rise(0.55)}><h2>Thoughtful interfaces.<br /><span>Production-grade systems.</span></h2><p>I engineer digital products across mobile, web, and the systems that connect them.</p></motion.div>
      <motion.div className="hero-actions" {...rise(0.7)}><div><MagneticLink href="#projects" className="button solid">View my work <ArrowDown size={16} /></MagneticLink><MagneticLink href="#contact" className="button outline">Let&apos;s connect <ArrowUpRight size={16} /></MagneticLink></div><a href={contact.resume} download className="resume-download mono">Download resume <Download size={13} /></a></motion.div>
    </div>
    <motion.div className="hero-baseline mono" {...rise(0.85)}><span>React <b>/</b> React Native <b>/</b> Next.js <b>/</b> TypeScript <b>/</b> Node.js</span><a href="#about" aria-label="Scroll to about">01 / SCROLL <span className="scroll-cue"><ArrowDown size={13} /></span></a></motion.div>
  </section>
  </>;
}
