"use client";

import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTheme } from "next-themes";
import { useReducedMotion } from "motion/react";
import * as THREE from "three";

const routes = [
  [[-2.3, 0.08, 0.9], [-1.25, 0.08, 0.9], [-1.25, 0.08, -0.45], [0, 0.08, -0.45]],
  [[2.25, 0.08, -0.8], [1.25, 0.08, -0.8], [1.25, 0.08, 0.6], [0, 0.08, 0.6]],
  [[-1.8, 0.08, -1.5], [-0.6, 0.08, -1.5], [-0.6, 0.08, 0], [0, 0.08, 0]],
  [[1.9, 0.08, 1.5], [0.65, 0.08, 1.5], [0.65, 0.08, 0], [0, 0.08, 0]],
];

function Beam({ start, end, color, width = 0.013 }: { start: number[]; end: number[]; color: string; width?: number }) {
  const origin = new THREE.Vector3(...start);
  const destination = new THREE.Vector3(...end);
  const direction = destination.clone().sub(origin);
  const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());
  return <mesh position={origin.add(destination).multiplyScalar(0.5)} quaternion={quaternion}>
    <cylinderGeometry args={[width, width, direction.length(), 4]} />
    <meshBasicMaterial color={color} />
  </mesh>;
}

function Signal({ points, offset, active }: { points: number[][]; offset: number; active: boolean }) {
  const signal = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!signal.current || !active) return;
    const progress = (clock.elapsedTime * 0.19 + offset) % (points.length - 1);
    const segment = Math.floor(progress);
    signal.current.position.lerpVectors(new THREE.Vector3(...points[segment]), new THREE.Vector3(...points[segment + 1]), progress - segment);
  });
  return <mesh ref={signal} position={points[0] as [number, number, number]}>
    <boxGeometry args={[0.075, 0.04, 0.075]} /><meshBasicMaterial color="#f47760" />
  </mesh>;
}

function System({ dark, active, mobile }: { dark: boolean; active: boolean; mobile: boolean }) {
  const assembly = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const move = (event: PointerEvent) => { pointer.current = { x: event.clientX / window.innerWidth - 0.5, y: event.clientY / window.innerHeight - 0.5 }; };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);
  useFrame((_, delta) => {
    if (!assembly.current || !active) return;
    assembly.current.rotation.y = THREE.MathUtils.damp(assembly.current.rotation.y, pointer.current.x * 0.16 + Math.min(window.scrollY / window.innerHeight, 1) * 0.22, 3, delta);
    assembly.current.rotation.x = THREE.MathUtils.damp(assembly.current.rotation.x, pointer.current.y * 0.06, 3, delta);
  });
  const edge = dark ? "#65656c" : "#83838a";
  const slab = dark ? "#28282d" : "#dedde0";
  const levels = mobile ? [-0.6, 0.4] : [-0.9, 0, 0.9];
  return <>
    <ambientLight intensity={dark ? 1.1 : 1.8} />
    <directionalLight position={[0, 6, 4]} intensity={3.5} color={dark ? "#e6e5ed" : "#ffffff"} />
    <pointLight position={[2, 2, 2]} intensity={12} color="#f36a50" />
    <group ref={assembly} rotation={[0, 0, -0.035]}>
      {levels.map((height, level) => <group key={height} position={[0, height, 0]}>
        <mesh><boxGeometry args={[5.3, 0.045, 3.8]} /><meshStandardMaterial color={slab} transparent opacity={0.82} roughness={0.35} metalness={0.65} /></mesh>
        <mesh><boxGeometry args={[5.31, 0.05, 3.81]} /><meshBasicMaterial color={edge} wireframe transparent opacity={0.5} /></mesh>
        {routes.map((points, routeIndex) => <group key={routeIndex}>
          {points.slice(1).map((end, pointIndex) => <Beam key={pointIndex} start={points[pointIndex]} end={end} color={routeIndex === level ? "#db604a" : edge} />)}
          <Signal points={points} offset={routeIndex * 0.75 + level} active={active} />
        </group>)}
        {[[-1.9, 0.16, -1.25], [1.85, 0.16, 1.1], [-1.8, 0.16, 1.15], [1.9, 0.16, -1.1]].map((position, nodeIndex) => <group key={nodeIndex} position={position as [number, number, number]}>
          <mesh><boxGeometry args={[0.42, 0.23, 0.42]} /><meshStandardMaterial color={dark ? "#85848d" : "#9c9ba4"} metalness={0.8} roughness={0.25} /></mesh>
          <mesh position={[0, 0.13, 0]}><boxGeometry args={[0.29, 0.014, 0.29]} /><meshBasicMaterial color={nodeIndex === level ? "#f47760" : edge} /></mesh>
        </group>)}
        <mesh position={[0, 0.14, 0]}><boxGeometry args={[1.2, 0.22, 1.0]} /><meshStandardMaterial color={level === 1 ? "#d85b44" : dark ? "#777680" : "#96959f"} metalness={0.6} roughness={0.3} /></mesh>
        {Array.from({ length: 7 }, (_, index) => <mesh key={index} position={[-0.46 + index * 0.15, 0.26, 0]}><boxGeometry args={[0.045, 0.018, 0.75]} /><meshStandardMaterial color={dark ? "#b5b2bd" : "#56545e"} metalness={0.6} roughness={0.4} /></mesh>)}
      </group>)}
      {[[-2.45, -1.6], [2.45, -1.6], [-2.45, 1.6], [2.45, 1.6]].map(([horizontal, depth]) => <Beam key={`${horizontal}-${depth}`} start={[horizontal, -1.1, depth]} end={[horizontal, 1.4, depth]} color={edge} width={0.019} />)}
    </group>
  </>;
}

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

export default function Architecture() {
  const { resolvedTheme } = useTheme();
  const reduced = useReducedMotion();
  const host = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [mobile, setMobile] = useState(false);
  const [supported, setSupported] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 700px)");
    const resize = () => setMobile(media.matches);
    const observe = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "80px" });
    if (host.current) observe.observe(host.current);
    const updateVisibility = () => setVisible(!document.hidden && Boolean(host.current && host.current.getBoundingClientRect().bottom > 0));
    document.addEventListener("visibilitychange", updateVisibility);
    const frame = requestAnimationFrame(() => {
      resize();
      try {
        const probe = document.createElement("canvas");
        const context = probe.getContext("webgl2");
        setSupported(Boolean(context));
        context?.getExtension("WEBGL_lose_context")?.loseContext();
      } catch { setSupported(false); }
    });
    media.addEventListener("change", resize);
    return () => { observe.disconnect(); cancelAnimationFrame(frame); media.removeEventListener("change", resize); document.removeEventListener("visibilitychange", updateVisibility); };
  }, []);
  return <div ref={host} className="architecture-canvas" aria-hidden="true">
    {supported && <SceneBoundary><Canvas
      camera={{ position: [7.3, 6.2, 8], fov: mobile ? 46 : 39 }}
      dpr={[1, mobile ? 1 : 1.5]} frameloop={!visible ? "never" : reduced ? "demand" : "always"}
      gl={{ alpha: true, antialias: !mobile, powerPreference: "low-power", preserveDrawingBuffer: true }}
      onCreated={({ gl }) => { gl.domElement.dataset.ready = "true"; }}
    ><System dark={resolvedTheme !== "light"} active={visible && !reduced} mobile={mobile} /></Canvas></SceneBoundary>}
  </div>;
}