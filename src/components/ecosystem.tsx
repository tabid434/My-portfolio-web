"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion, type AnimationPlaybackControls } from "motion/react";
import { ArrowRight, Braces, Layers3, Network, Store, Workflow } from "lucide-react";
import { ecosystem } from "@/lib/portfolio";

const icons = [Layers3, Network, Workflow, Braces, Store];
const ease = [0.16, 1, 0.3, 1] as const;
const sliderTechnologies = ecosystem.flatMap((entry) => entry.technologies);
const slideSeconds = 5;

function sync(visible: boolean, controls: AnimationPlaybackControls | null) {
  if (!visible || document.hidden) controls?.pause();
  else controls?.play();
}

export default function Ecosystem() {
  const [selected, setSelected] = useState(0);
  const reduced = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const rail = useMotionValue(0);
  const playback = useRef<AnimationPlaybackControls | null>(null);
  const visible = useRef(false);
  const layer = ecosystem[selected];
  useEffect(() => {
    const node = root.current;
    if (!node || reduced) return;
    const apply = (next: boolean) => { visible.current = next; sync(visible.current, playback.current); };
    const onVisibility = () => sync(visible.current, playback.current);
    const observer = new IntersectionObserver(([entry]) => apply(entry.isIntersecting), { threshold: 0.45 });
    observer.observe(node);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced]);
  useEffect(() => {
    const count = ecosystem.length;
    rail.set(selected / count);
    if (reduced) return;
    const controls = animate(rail, (selected + 1) / count, {
      duration: slideSeconds,
      ease: "linear",
      onComplete: () => setSelected((selected + 1) % count),
    });
    playback.current = controls;
    sync(visible.current, controls);
    return () => { controls.stop(); playback.current = null; };
  }, [selected, reduced, rail]);
  const item = { hidden: { opacity: 0, y: reduced ? 0 : 18, filter: reduced ? "blur(0px)" : "blur(4px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease } } };
  return <div className="ecosystem" ref={root}>
    <motion.div className="ecosystem-tabs" role="tablist" aria-label="Technology layers" style={{ "--rail-progress": rail } as never}>{ecosystem.map((entry, index) => {
      const Icon = icons[index];
      return <button key={entry.name} id={`layer-${index}`} role="tab" aria-selected={selected === index} aria-controls="layer-panel" tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={(event) => {
        if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        const count = ecosystem.length;
        const next = event.key === "Home" ? 0 : event.key === "End" ? count - 1 : (selected + (event.key === "ArrowRight" ? 1 : count - 1)) % count;
        setSelected(next); document.getElementById(`layer-${next}`)?.focus();
      }}>
        {selected === index && <motion.span layoutId="tab-indicator" className="tab-indicator" transition={{ type: "spring", stiffness: 380, damping: 34 }} />}
        <Icon size={20} /><span>{entry.name}</span><span className="mono">0{index + 1}</span>
      </button>;
    })}</motion.div>
    <div className="tech-slider" aria-hidden="true"><div className="tech-slider-track">{[0, 1].map((copy) => <div key={copy}>{sliderTechnologies.map((technology) => <span key={`${copy}-${technology}`}>{technology}</span>)}</div>)}</div></div>
    <div id="layer-panel" role="tabpanel" aria-labelledby={`layer-${selected}`} tabIndex={0} className="ecosystem-panel spotlight">
      <div className="ecosystem-core" aria-hidden="true">
        <span>ABID.</span><i /><i /><i />
        <b className="orbit orbit-1"><em /></b><b className="orbit orbit-2"><em /></b>
      </div>
      <AnimatePresence mode="wait"><motion.div key={selected} initial="hidden" animate="show" exit={reduced ? undefined : { opacity: 0, y: -10, transition: { duration: 0.18 } }} variants={{ show: { transition: { staggerChildren: 0.045 } } }} className="ecosystem-content">
        <motion.p className="mono" variants={item}>{layer.note}</motion.p>
        <div className="connected-technologies">{layer.technologies.map((technology) => <motion.span key={technology} variants={item}>{technology}</motion.span>)}</div>
        <motion.p className="ecosystem-context" variants={item}><ArrowRight size={15} />{layer.project}</motion.p>
      </motion.div></AnimatePresence>
    </div>
  </div>;
}
