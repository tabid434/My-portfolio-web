import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { projects } from "@/lib/portfolio";
import { Header, Reveal, Scramble, SplitHeading } from "@/components/site-shell";
import ProjectVisual from "@/components/project-visual";

export const dynamicParams = false;

export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};
  return { title: `${project.title} | Talha Abid`, description: project.summary, alternates: { canonical: `/projects/${slug}` }, openGraph: { title: `${project.title} | Talha Abid`, description: project.summary, url: `/projects/${slug}` }, twitter: { title: `${project.title} | Talha Abid`, description: project.summary } };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = projects.findIndex((item) => item.slug === slug);
  if (index < 0) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  return <><a href="#case-main" className="skip-link">Skip to case study</a><Header /><main id="case-main" className="case-page">
    <div className="case-back"><Link href="/#projects"><ArrowLeft size={15} /> Selected work</Link><Scramble className="mono" text={`${String(index + 1).padStart(2, "0")} / PROJECT STUDY`} /></div>
    <div className="case-heading"><Reveal><p className="mono">{project.company}</p></Reveal><SplitHeading as="h1" lines={[<span key="title">{project.title}<span className="accent">.</span></span>]} /><Reveal delay={0.2}><p className="case-summary">{project.summary}</p></Reveal></div>
    <div className="case-metadata"><div><span className="mono">ROLE</span><p>{project.role}</p></div><div><span className="mono">TECHNOLOGY / CAPABILITIES</span><p>{project.technologies.join(" / ")}</p></div>{project.metric && <div><span className="mono">PRODUCT SCALE</span><p>{project.metric}</p></div>}{project.sourceUrl && <div><span className="mono">PRODUCT REFERENCE</span><p><a className="inline-link" href={project.sourceUrl} target="_blank" rel="noreferrer">Open live reference <ArrowUpRight size={14} /></a></p></div>}</div>
    <Reveal className="case-visual"><ProjectVisual project={project} /></Reveal>
    <Reveal><section className="case-section"><span className="mono">01 / OVERVIEW</span><div><h2>{project.category}</h2><p>{project.summary}</p><h3>The problem</h3><p>{project.problem}</p><h3>The approach</h3><p>{project.solution}</p></div></section></Reveal>
    <Reveal><section className="case-section"><span className="mono">02 / ENGINEERING</span><div><h2>Where the complexity lives.</h2><ol className="challenges">{project.challenges.map((item) => <li key={item}>{item}</li>)}</ol></div></section></Reveal>
    <Reveal><section className="case-section"><span className="mono">03 / ARCHITECTURE & WORKFLOW</span><div><h2>From intent to interaction.</h2><ol className="workflow-diagram">{project.workflow.map((step, stepIndex) => <li key={step}><span className="mono">0{stepIndex + 1}</span><span>{step}</span>{stepIndex < project.workflow.length - 1 && <ArrowRight size={18} />}</li>)}</ol></div></section></Reveal>
    <Reveal><section className="case-section"><span className="mono">04 / KEY CAPABILITIES</span><div className="case-features">{project.features.map((item) => <p key={item}><Check size={16} />{item}</p>)}</div></section></Reveal>
    <section className="case-next"><span className="mono">NEXT PROJECT</span><Link href={`/projects/${next.slug}`} data-cursor="NEXT" className="case-next-link"><h2>{next.title}</h2><ArrowUpRight size={48} /></Link><Link href="/#contact" className="inline-link">Discuss a product <ArrowUpRight size={16} /></Link></section>
  </main></>;
}