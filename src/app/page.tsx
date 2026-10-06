import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Download, MapPin, Plus } from "lucide-react";
import { contact, projects } from "@/lib/portfolio";
import { Counter, Header, Reveal, Scramble, SplitHeading } from "@/components/site-shell";
import ContactForm from "@/components/contact-form";
import Ecosystem from "@/components/ecosystem";
import Hero from "@/components/hero";
import ProjectVisual from "@/components/project-visual";
import TiltLink from "@/components/tilt-link";
import Timeline from "@/components/timeline";

const featuredProjectSlugs = ["cairasu", "kaido", "tudu", "tour-27", "eflea", "save-e"];
const archiveProjectSlugs = ["dermeez", "brackets-team", "veronicas-insurance", "boltiq"];
const marquee = ["React Native", "Next.js", "TypeScript", "Node.js", "NestJS", "Firebase", "AI Integrations", "Real-time", "Stripe", "Agora"];

const stats = [
  { value: 200, suffix: "K+", label: "App downloads on TUDU" },
  { value: 3, suffix: "+", label: "Years shipping products" },
  { value: 10, suffix: "+", label: "Products engineered" },
  { value: 4, suffix: "+", label: "Teams and studios" },
];

const principles = [
  ["Build with intent", "Start with the problem. Let the product, not the technology, define the work."],
  ["Architect for change", "Build boundaries that let a product evolve without rewriting its foundations."],
  ["Design for people", "Make complex systems understandable at the point where people use them."],
  ["Ship with confidence", "Treat implementation, review, and clear communication as one discipline."],
  ["Keep complexity in check", "Make the important decisions explicit. Keep the rest as simple as it can be."],
];

function Label({ index, text, aside }: { index: string; text: string; aside: ReactNode }) {
  return <div className="section-label mono"><Scramble text={`${index} / ${text}`} /><span>{aside}</span></div>;
}

export default function Home() {
  return <>
    <a href="#main" className="skip-link">Skip to content</a>
    <Header />
    <main id="main">
      <Hero />

      <div className="marquee" aria-hidden="true">
        <div className="marquee-band band-primary"><div className="marquee-track">{[0, 1].map((copy) => <div key={copy}>{marquee.map((item) => <span key={item}>{item}<i>✦</i></span>)}</div>)}</div></div>
        <div className="marquee-band band-secondary"><div className="marquee-track reverse">{[0, 1].map((copy) => <div key={copy}>{marquee.map((item) => <span key={item}>{item}<i>✦</i></span>)}</div>)}</div></div>
      </div>

      <section id="about" className="section about-section">
        <Label index="01" text="THE ENGINEER" aside="Beyond the interface" />
        <div className="about-composition"><div className="about-title"><SplitHeading lines={["Good software is", "a series of", <span className="muted" key="m">considered decisions.</span>]} /><Reveal className="portrait-line"><div className="portrait-frame"><Image src="/talha-headshot.jpg" alt="Talha Abid" width={148} height={185} sizes="(max-width: 800px) 110px, 148px" /></div><div><strong>Talha Abid</strong><span>Software Engineer</span><span className="mono">Lahore / Gujranwala</span></div></Reveal></div><Reveal className="about-copy" delay={0.1}><p className="lead">I build the parts people use.<br />And understand the systems they depend on.</p><p>My work spans cross-platform applications, responsive web products, and complex business platforms. React Native, React, Next.js, and TypeScript are at the core of that practice.</p><p>From offline care workflows to AI-assisted media production, I work where interfaces, integrations, and product requirements meet. The aim is consistent: make the complexity manageable, and the experience clear.</p><a href="#experience" className="inline-link">A closer look at the work <ArrowUpRight size={16} /></a></Reveal></div>
        <div className="stats-grid">{stats.map((stat, index) => <Reveal key={stat.label} className="stat spotlight" delay={index * 0.08}><strong><Counter to={stat.value} suffix={stat.suffix} /></strong><span className="mono">{stat.label}</span></Reveal>)}</div>
        <div className="expertise-line mono"><span>Mobile + web</span><span>Frontend leadership</span><span>AI-assisted workflows</span><span>Real-time products</span></div>
      </section>

      <section id="stack" className="section stack-section"><Label index="02" text="TECHNOLOGY ECOSYSTEM" aside="Connected, by design" /><div className="section-heading"><SplitHeading lines={["Different layers.", <span className="muted" key="m">One product mindset.</span>]} /><Reveal delay={0.15}><p>The tools change with the problem.<br />The attention to architecture stays.</p></Reveal></div><Reveal><Ecosystem /></Reveal></section>

      <section id="experience" className="section experience-section"><Label index="03" text="PROFESSIONAL CHAPTERS" aside="A growing scope of work" /><div className="section-heading"><SplitHeading lines={["From foundations", <span className="muted" key="m">to complex products.</span>]} /><a className="inline-link" href={contact.resume} download>Full resume <Download size={15} /></a></div>
        <Timeline>
          <Reveal className="career-chapter"><div className="career-meta"><span className="timeline-point" /><span className="mono">01 / DIRECT COLLABORATION</span><p>Remote client work (Present)</p></div><div className="career-body"><h3>K&amp;M Productions</h3><p className="career-role">Independent product work / remote collaboration</p><p>Working directly with remote clients across product requirements and implementation. Client identities remain private where they have not been provided.</p><div className="client-chapter"><span className="mono">KM PRODUCTIONS / KAIDO</span><h4>Property media, from upload to approval.</h4><p>Complete frontend development and responsive UI, frontend architecture, and some backend contribution. AI-assisted media generation, configurable video workflows, permissions, review, and billing.</p><Link className="inline-link" href="/projects/kaido">Explore Kaido <ArrowUpRight size={15} /></Link></div></div></Reveal>
          <Reveal className="career-chapter"><div className="career-meta"><span className="timeline-point" /><span className="mono">02 / MOBILE AT SCALE</span><p>Feb 2026 – May-2026</p></div><div className="career-body"><div className="career-title-row"><h3>DEVFIED</h3><span className="scale-stat">200K+ <small>downloads</small></span></div><p className="career-role">Software engineering / TUDU application</p><p>Joined DEVFIED after leaving Brackets in February 2026. TUDU is an extensive entry and exam platform with teacher, mentor, student, and parent experiences. Responsive mobile, tablet, and iPad interfaces meet PDF-heavy workflows, editable content, writing, drawing, and annotation.</p><Link className="inline-link" href="/projects/tudu">Inside TUDU <ArrowUpRight size={15} /></Link></div></Reveal>
          <Reveal className="career-chapter"><div className="career-meta"><span className="timeline-point" /><span className="mono">03 / PRODUCT ENGINEERING</span><p>July 2023 – February 2026</p></div><div className="career-body"><h3>Brackets Private Limited</h3><p className="career-role">React Native Developer / Mobile App Developer / Web Developer</p><p>Production work across mobile and web: frontend leadership, multi-role operations, healthcare communication, and AI-assisted application workflows.</p><div className="work-chapters">{projects.filter((project) => ["cairasu", "dermeez", "boltiq"].includes(project.slug)).map((project) => <details key={project.slug}><summary>{project.title}<span>{project.role}</span><Plus size={16} /></summary><div><p>{project.solution}</p><Link className="inline-link" href={`/projects/${project.slug}`}>Explore the project <ArrowUpRight size={14} /></Link></div></details>)}<details><summary>Other product work<span>Mobile / Real-time / Payments</span><Plus size={16} /></summary><div><p>Additional product experience includes Brackets Team Management, Eflea, Veronica&apos;s Insurance, and Tour 27. Attendance, smartwatch connectivity, payments, and streaming broadened the range of workflows.</p><a className="inline-link" href="#project-archive">View the project index <ArrowDown size={14} /></a></div></details></div></div></Reveal>
          <Reveal className="career-chapter"><div className="career-meta"><span className="timeline-point" /><span className="mono">04 / FOUNDATION</span><p>June 2023</p></div><div className="career-body"><h3>Software Alliance</h3><p className="career-role">React Native Intern</p><p>A first professional chapter in mobile application development.</p></div></Reveal>
        </Timeline>
      </section>

      <section id="projects" className="section projects-section"><Label index="04" text="SELECTED WORK" aside="Real products. Different dimensions." /><div className="section-heading"><SplitHeading lines={["The work,", <span className="muted" key="m">in context.</span>]} /><Reveal delay={0.15}><p>Mobile. Web. AI-assisted systems.<br />The details behind the finished experience.</p></Reveal></div>
        {featuredProjectSlugs.map((slug, index) => { const project = projects.find((item) => item.slug === slug); if (!project) return null; return <Reveal className={`project-showcase showcase-${index}`} key={project.slug}>
          <div className="project-topline mono"><span><b>0{index + 1}</b> / {project.company}</span><span>{project.visual === "media" ? "AI + MEDIA" : project.visual === "exam" ? "MOBILE AT SCALE" : project.visual === "energy" ? "IOT + ML" : "PRODUCT ENGINEERING"}</span></div>
          <TiltLink href={`/projects/${project.slug}`} className="project-visual-link" cursor="VIEW" label={`View ${project.title} case study`}><ProjectVisual project={project} /><span className="project-open"><ArrowUpRight size={24} /></span></TiltLink>
          <div className="project-summary"><div><Link href={`/projects/${project.slug}`} className="project-title-link"><h3>{project.title} <ArrowUpRight /></h3></Link><p>{project.category}</p></div><div className="project-description"><p>{project.summary}</p><div className="project-metadata"><span><small>ROLE</small>{project.role}</span><span><small>{project.slug === "kaido" || project.slug === "tudu" ? "FOCUS" : "TECHNOLOGY"}</small>{project.technologies.join(" / ")}</span></div></div></div>
        </Reveal>; })}
        <div id="project-archive" className="project-archive"><div className="archive-heading"><h3>More product work</h3><span className="mono">THE INDEX / 07—10</span></div>{archiveProjectSlugs.map((slug, index) => { const project = projects.find((item) => item.slug === slug); if (!project) return null; return <Link href={`/projects/${project.slug}`} className="archive-row" key={project.slug} data-cursor="VIEW"><span className="mono">{String(index + 7).padStart(2, "0")}</span><h4>{project.title}</h4><span>{project.technologies.join(" / ")}</span><ArrowUpRight size={21} /></Link>; })}</div>
      </section>

      <section className="section principles-section"><Label index="05" text="WORKING PRINCIPLES" aside="Simple ideas. Applied consistently." /><div className="principles-layout"><div className="principles-heading"><SplitHeading lines={["How I approach", <span className="muted" key="m">the work.</span>]} /></div><div className="principle-list">{principles.map(([title, copy], index) => <Reveal key={title} delay={index * 0.05}><div className="principle spotlight"><span className="mono">0{index + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></div></Reveal>)}</div></div></section>

      <section id="education" className="section education-section"><Label index="06" text="EDUCATION" aside="The foundation" /><Reveal className="education-row spotlight"><div><h2>Gift University</h2><p>BS Software Engineering</p></div><span className="mono">Batch / March 2019</span><span className="education-gpa">3.21 <small>GPA</small></span></Reveal></section>

      <section id="contact" className="section contact-section"><Label index="07" text="START A CONVERSATION" aside={<><i className="status-dot" /> Open to thoughtful collaborations</>} /><div className="contact-heading"><SplitHeading lines={["Let's build something", <span className="gradient-text" key="m">worth shipping.</span>]} /><ArrowUpRight className="contact-arrow" /></div><div className="contact-layout"><Reveal className="contact-details"><p>Web applications, mobile products, AI-assisted workflows, or a complex frontend that needs a clear direction.</p><a href={`mailto:${contact.email}`} className="email-link" data-stick>{contact.email}<ArrowUpRight size={18} /></a><p className="contact-location"><MapPin size={15} />{contact.location}</p><a className="phone-link" href={`tel:${contact.phone}`}>+92 343 6060252</a><div className="social-links"><a href={contact.github} target="_blank" rel="noreferrer" data-stick>GitHub <ArrowUpRight size={14} /></a><a href={contact.linkedin} target="_blank" rel="noreferrer" data-stick>LinkedIn <ArrowUpRight size={14} /></a></div></Reveal><Reveal delay={0.12}><ContactForm /></Reveal></div></section>
    </main>
    <footer className="site-footer">
      <div className="footer-giant" data-spotlight aria-hidden="true" data-text="TALHA ABID.">TALHA ABID.</div>
      <div className="footer-top"><a className="footer-name" href="#home">TALHA ABID<span>.</span></a><p>Full-Stack Developer<br />Software Engineer</p><div className="footer-links"><a href={contact.github} data-stick>GitHub</a><a href={contact.linkedin} data-stick>LinkedIn</a><a href={`mailto:${contact.email}`} data-stick>Email</a><a href={contact.resume} download data-stick>Resume <Download size={12} /></a></div></div>
      <div className="footer-bottom mono"><span>© {new Date().getFullYear()} Talha Abid</span><span>Designed and engineered with intention.</span><a href="#home">Back to top <ArrowRight size={13} className="up-arrow" /></a></div>
    </footer>
  </>;
}
