import { ImageResponse } from "next/og";

export const alt = "Talha Abid - Full-Stack Developer and Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#111113", color: "#f0efed", width: "100%", height: "100%", padding: "65px 75px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 19, color: "#a1a0a8" }}><span>SOFTWARE ENGINEER</span><span>MOBILE / WEB / AI-ASSISTED PRODUCTS</span></div>
    <div style={{ display: "flex", flexDirection: "column", fontSize: 130, lineHeight: 0.95, fontWeight: 700 }}><span>TALHA</span><div style={{ display: "flex" }}>ABID<span style={{ color: "#98B2D8" }}>.</span></div></div>
    <div style={{ display: "flex", borderTop: "1px solid #343439", paddingTop: 27, justifyContent: "space-between", fontSize: 19 }}><span>Thoughtful interfaces. Production-grade systems.</span><span style={{ color: "#98B2D8" }}>React / Native / Next.js</span></div>
  </div>, size);
}