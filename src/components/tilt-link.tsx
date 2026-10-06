"use client";

import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";
import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

const MotionLink = motion.create(Link);

export default function TiltLink({ href, className, children, label, cursor }: { href: string; className?: string; children: ReactNode; label: string; cursor?: string }) {
  const reduced = useReducedMotion();
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 160, damping: 20 });
  const rotateY = useSpring(tiltY, { stiffness: 160, damping: 20 });
  function move(event: ReactPointerEvent<HTMLAnchorElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    event.currentTarget.style.setProperty("--gx", `${x * 100}%`);
    event.currentTarget.style.setProperty("--gy", `${y * 100}%`);
    if (reduced || event.pointerType !== "mouse") return;
    tiltY.set((x - 0.5) * 7);
    tiltX.set((0.5 - y) * 6);
  }
  return <MotionLink href={href} className={className} aria-label={label} data-cursor={cursor} onPointerMove={move} onPointerLeave={() => { tiltX.set(0); tiltY.set(0); }} style={reduced ? undefined : { rotateX, rotateY, transformPerspective: 1600 }}>
    {children}
    <span className="tilt-glare" aria-hidden="true" />
  </MotionLink>;
}
