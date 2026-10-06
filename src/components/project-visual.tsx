import Image from "next/image";
import { ArrowRight, AudioLines, Check, FileText, Layers3, MapPin, Play, Plus, Video } from "lucide-react";
import type { Project } from "@/lib/portfolio";

export default function ProjectVisual({ project }: { project: Project }) {
    return <div className={`project-art art-${project.visual}`} aria-label={`${project.title} conceptual workflow illustration`}>
        <span className="art-caption mono">{project.visual === "system" ? "Workflow study" : "Interface study"} / {project.title}</span>
        {project.visual === "care" ? <>
            <div className="care-brand">care,<br /><span>connected.</span></div>
            <div className="care-web"><div className="mock-sidebar"><span className="mock-logo">c.</span><i /><i /><i /><i /></div><div className="mock-content"><div className="mock-topline">Care operations <span>Overview</span></div><h4>Everything in its place.</h4><div className="mock-stats"><div>Attendance<strong>Synced <Check size={12} /></strong></div><div>Team<strong>Connected</strong></div></div><div className="mock-table"><span>Caregiver schedule</span>{["Morning visits", "Afternoon visits", "Evening visits"].map((label, index) => <div key={label}><i className={`avatar avatar-${index}`} /><span>{label}</span><b>Scheduled</b></div>)}</div></div></div>
            <div className="care-phone"><div className="phone-island" /><div className="phone-top">cairasu <Plus size={13} /></div><p>Good morning.</p><h4>Your day,<br />at a glance.</h4><div className="phone-map"><MapPin size={24} /><span>Scheduled visit</span></div><div className="visit-row"><span>Attendance</span><Check size={14} /></div><div className="phone-action">Check in <ArrowRight size={12} /></div><div className="phone-bottom" /></div>
            <div className="art-footnote mono">Mobile + web / One connected system</div>
        </> : project.visual === "media" ? <>
            <div className="media-brand">kaido<span>Property. In motion.</span></div>
            <div className="media-editor"><div className="editor-top"><span><Video size={12} /> Video workspace</span><span>Review <ArrowRight size={12} /></span></div><div className="editor-stage"><Image src="/property-study.jpg" alt="Modern residential architecture used in a conceptual property-video composition" fill sizes="(max-width: 700px) 90vw, 65vw" /><div className="film-title">A new<br />perspective.</div><div className="play-symbol"><Play size={17} fill="currentColor" /></div><span className="film-label mono">PROPERTY FILM / PREVIEW</span></div><div className="editor-controls"><span><Layers3 size={12} /> Media sequence</span><span>Review / approval</span></div><div className="timeline-clips">{["01", "02", "03", "04", "05"].map((item) => <div key={item}><Image src="/property-study.jpg" alt="" fill sizes="120px" /><span>{item}</span></div>)}<i /></div></div>
            <div className="art-footnote mono">Upload / Generate / Refine / Approve</div>
        </> : project.visual === "exam" ? <>
            <div className="exam-scale"><strong>TUDU </strong><span className="mono">200K + Application downloads</span></div>
            <div className="tudu-phone tudu-phone-primary">
                <Image src="/tudu-hero.png" alt="TUDU question-solving app interface" fill sizes="190px" /></div>
            <div className="tudu-phone tudu-phone-secondary"><Image src="/tudu-feature.png" alt="TUDU learning feature interface" fill sizes="140px" /></div><div className="tablet"><div className="tablet-camera" /><div className="tablet-screen"><div className="tablet-nav"><span>Learning workspace</span><span><FileText size={14} /> Documents</span></div><div className="document-content"><aside><span>01</span><span>02</span><span>03</span></aside><div><span className="mono">Study / Practice / Review</span><h4>Room to<br />work it out.</h4><div className="document-lines"><i /><i /><i /><i /></div><div className="annotation">Ideas take shape here.</div><div className="document-tools"><span>Write</span><span>Draw</span><span>Annotate</span></div></div></div></div></div>
            <div className="art-footnote mono">Teacher / Mentor / Student / Parent</div>
        </> : project.visual === "health" || project.visual === "analysis" ? <>
            <div className="health-heading">{project.visual === "health" ? <>A clearer<br />conversation.</> : <>Assisted analysis.<br /><span>Human review.</span></>}</div>
            <div className="health-flow"><div><span className="flow-symbol">{project.visual === "health" ? <Video size={24} /> : <AudioLines size={24} />}</span><span>Patient information</span><small>History / photographs / audio</small></div><ArrowRight className="flow-arrow" size={20} /><div><span className="flow-symbol">{project.visual === "health" ? <AudioLines size={24} /> : <Layers3 size={24} />}</span><span>{project.visual === "health" ? "Jitsi communication" : "BoltIQ analysis"}</span><small>{project.visual === "health" ? "Audio + video" : "Streaming response"}</small></div><ArrowRight className="flow-arrow" size={20} /><div><span className="flow-symbol"><Check size={24} /></span><span>Doctor review</span><small>Evaluation / response</small></div></div>
            <div className="art-footnote mono">{project.visual === "health" ? "Patient submission / Doctor-led care" : "AI-assisted, not autonomous diagnosis"}</div>
        </> : project.slug === "tour-27" ? <>
            <div className="tour-image tour-image-main"><Image src="/tour27-destination.jpg" alt="Tour 27 destination landscape with a mountain lake" fill sizes="(max-width: 700px) 90vw, 70vw" /></div>
            <div className="tour-image tour-image-secondary"><Image src="/tour27-lake.jpg" alt="Tour 27 destination view from a live guide experience" fill sizes="(max-width: 700px) 46vw, 32vw" /></div>
            <div className="tour-signal"><span className="live-pulse" /> LIVE TOUR <small>Explore together, right now.</small></div>
            <div className="tour-route"><span className="mono">LIVE MAP / 001</span><i /><i /><i /><b>GUIDED DISCOVERY</b></div>
            <div className="tour-booking"><span className="mono">NEXT EXPERIENCE</span><strong>Mountain lake view</strong><small>Hosted live / Group tour</small><button><Play size={12} fill="currentColor" /> Preview tour</button></div>
            <div className="art-footnote mono">Booking / live video / real-time communication</div>
        </> : project.slug === "eflea" ? <>
            <div className="eflea-backdrop"><Image src="/eflea-map.png" alt="Eflea live location interface" fill sizes="(max-width: 700px) 90vw, 60vw" /></div>
            <div className="eflea-phone"><Image src="/eflea-functions.png" alt="Eflea watch functions screen" fill sizes="220px" /></div>
            <div className="eflea-copy"><span className="mono">CONNECTED CARE / EFLEA</span><h3>Watch essentials.<br /><span>Always within reach.</span></h3><p>Health signals, location, and safety features connected through one mobile experience.</p></div>
            <div className="eflea-status"><span className="live-pulse" /> DEVICE CONNECTED <b>GPS / HEALTH / SOS</b></div>
            <div className="art-footnote mono">Location / health signals / family connection</div>
        </> : project.visual === "energy" ? <>
            <div className="energy-copy"><span className="mono">IOT / ML / LOAD MONITORING</span><h3>Every unit,<br /><span>accounted for.</span></h3><p>Live voltage and current, predicted units, custom alarms, and bills from a dual single-phase energy meter.</p></div>
            <div className="energy-phones">
                <div className="energy-phone energy-phone-1"><Image src="/save-e-prediction.jpg" alt="Save-E unit prediction screen" fill sizes="190px" /></div>
                <div className="energy-phone energy-phone-2"><Image src="/save-e-voltage.jpg" alt="Save-E live voltage graph screen" fill sizes="190px" /></div>
                <div className="energy-phone energy-phone-3"><Image src="/save-e-units.jpg" alt="Save-E historical units graph screen" fill sizes="190px" /></div>
            </div>
            <div className="energy-status"><span className="live-pulse" /> LIVE METER <b>220 V / UNITS / ALERTS</b></div>
            <div className="art-footnote mono">Measure / Predict / Alert</div>
        </> : <div className="system-visual"><span className="system-monogram">{project.title.slice(0, 2)}</span><div className="system-path">{project.workflow.map((step, index) => <div key={step}><span className="mono">0{index + 1}</span><span>{step}</span><ArrowRight size={18} /></div>)}</div></div>}
    </div>;
}