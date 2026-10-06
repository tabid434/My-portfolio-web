"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useSpring } from "motion/react";

export default function Timeline({ children }: { children: ReactNode }) {
  const host = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: host, offset: ["start 70%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  return <div ref={host} className="career-timeline">
    <motion.span className="timeline-progress" style={{ scaleY }} aria-hidden="true" />
    {children}
  </div>;
}
